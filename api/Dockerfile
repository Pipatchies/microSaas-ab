FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Create a non-root user (best practice)
RUN useradd -m appuser

WORKDIR /app

# Minimal system dependencies (and cleanup)
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies first to leverage Docker cache
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ .

# These variables will be overridden at runtime via docker-compose/env
ENV SECRET_KEY=build-secret \
    DEBUG=0 \
    ALLOWED_HOSTS="*" \
    GUNICORN_WORKERS=3

# Collect static files
# RUN python manage.py collectstatic --noinput

# Permissions and port
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8800

# Start command (Gunicorn)
CMD ["sh", "-c", "gunicorn config.wsgi:application -b 0.0.0.0:8800 -w ${GUNICORN_WORKERS}"]