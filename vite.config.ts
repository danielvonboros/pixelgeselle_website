import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

interface MockRequest {
  method?: string;
  on(event: "data" | "end", listener: (chunk?: string) => void): void;
}

const contactMock = (): Plugin => ({
  name: "contact-mock",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/contact.php", (incoming, response) => {
      const request = incoming as unknown as MockRequest;
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      if (request.method === "GET") {
        response.end(JSON.stringify({ success: true, question: "3 + 4", token: "dev" }));
        return;
      }
      let body = "";
      request.on("data", (chunk) => {
        body += chunk ?? "";
      });
      request.on("end", () => {
        const captcha = /name="captcha"\r\n\r\n(\d+)/.exec(body)?.[1];
        if (captcha !== "7") {
          response.statusCode = 400;
          response.end(JSON.stringify({ success: false, error: "bad_captcha" }));
          return;
        }
        server.config.logger.info("[contact-mock] Nachricht angenommen, im Dev-Modus wird keine E-Mail verschickt");
        response.end(JSON.stringify({ success: true }));
      });
    });
  },
});

export default defineConfig({
  plugins: [svgr(), react(), contactMock()],
});
