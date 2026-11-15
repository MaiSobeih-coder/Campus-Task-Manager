# Technical Notes

## Biggest Docker Problem & Solution
The most significant challenge was dealing with network instability and timeouts while pulling base images (such as `eclipse-temurin:25-jre-alpine`) from Docker Hub. At one point, the download failed midway with an `unexpected EOF` error, and at another time, DNS resolution completely failed (`no such host`).

**How I solved it:**
1. I configured manual DNS servers (`8.8.8.8`) and a proxy in Docker Desktop settings to bypass local network restrictions.
2. I utilized Docker's layer caching. By separating the `pom.xml` copy from the source code copy in the Dockerfile (`COPY pom.xml .` followed by `RUN mvn dependency:go-offline`), I ensured that if the build failed later, I wouldn't have to re-download Maven dependencies on the next try.
3. I used a **Multi-stage Docker build** to separate the heavy Maven build environment from the lightweight runtime environment, reducing the final image size significantly.

## Most Important Git/GitHub Lesson
The most valuable lesson I learned was the importance of **atomic, meaningful commit messages**. In previous projects, I used vague messages like "update" or "fix", which made tracking progress impossible.

For this assignment, I adopted the **Conventional Commits** standard (e.g., `feat:`, `docs:`, `fix:`, `docker:`). This not only made the repository history look professional and readable but also helped me logically structure my work: first the backend logic, then the frontend UI, then the Dockerization, and finally the documentation. I also learned the importance of `.gitignore` and `.dockerignore` to keep the repository clean from unnecessary files like `target/` and IDE configurations.