# Deployment

## VPS

Install Docker sekali saja di VPS:

```bash
ssh ubuntu@43.157.204.188
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu
exit
```

Login ulang, lalu cek:

```bash
ssh ubuntu@43.157.204.188
docker ps
docker compose version
```

## GitHub Secrets

Tambahkan di `Settings > Secrets and variables > Actions`:

```text
VPS_HOST=43.157.204.188
VPS_USER=ubuntu
VPS_SSH_KEY=<private key khusus deploy>
PRODUCTION_ENV=<isi .env.production>
```

Isi `PRODUCTION_ENV` bisa mulai dari `.env.production.example`, lalu ganti password dan secret.

## Cloudflare

DNS records:

```text
A     sahabatcerdikdm.com      43.157.204.188
CNAME www                     sahabatcerdikdm.com
```

SSL/TLS mode: `Full` atau `Full (strict)`.

## Deploy

Push ke `main` akan menjalankan test, build, lalu deploy otomatis ke VPS.

Manual deploy bisa dari tab `Actions > Deploy > Run workflow`.
