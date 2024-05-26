package main

import (
	"context"
	"log"
	"os"
	"strings"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/gofiber/fiber/v2"
)

func okHandler(ctx *fiber.Ctx) error {
	return ctx.SendString("OK")
}

func main() {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()

	contextPath := os.Getenv("WEB_CONTEXT_PATH")
	port := os.Getenv("WEB_PORT")
	host := os.Getenv("WEB_HOST")

	if port == "" {
		port = "8080"
	}

	address := ""
	if host == "" {
		address = ":" + port
	} else {
		address = host + ":" + port
	}

	hostname, err := os.Hostname()
	if err != nil {
		panic(err)
	}

	group := ""

	containers, err := cli.ContainerList(context.Background(), container.ListOptions{All: true})
	if err != nil {
		panic(err)
	}

	for _, container := range containers {
		if strings.HasPrefix(container.ID, hostname) {
			group = container.Labels["com.docker.compose.project"]
			break
		}
	}

	ignoreGroup := false
	if group == "" {
		ignoreGroup = true
	}

	contextPath = strings.TrimSuffix(contextPath, "/")

	app := fiber.New()
	app.Get("/liveness", okHandler)
	app.Get("/readiness", okHandler)
	app.Get(contextPath+"/service", func(c *fiber.Ctx) error {
		containers, err := cli.ContainerList(context.Background(), container.ListOptions{All: true})
		if err != nil {
			return err
		}

		services := map[string]string{}

		for _, container := range containers {
			key := ""
			value := ""
			hasGroup := false
			for k, v := range container.Labels {
				if k == "com.docker.compose.project" && v == group {
					hasGroup = true
				}
				if k == "io.github.kprasad99.frontend.name" {
					key = v
				}
				if k == "io.github.kprasad99.frontend.path" {
					value = v
				}
			}
			if key != "" && value != "" && (ignoreGroup || hasGroup) {
				services[key] = value
			}
		}
		return c.JSON(services)
	})

	log.Println("Started web server")
	if err := app.Listen(address); err != nil {
		log.Panic("Failed to start web server", err)
	}
}
