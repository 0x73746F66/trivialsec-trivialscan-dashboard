# <img src=".repo/assets/icon-512x512.png"  width="52" height="52"> Trivial Scanner Dashboard

[![pipeline status](https://gitlab.com/trivialsec/trivialscan-dashboard/badges/main/pipeline.svg)](https://gitlab.com/trivialsec/trivialscan-dashboard/commits/main)

S3 database for the OSS Trivial Scanner dashboard

## Getting started

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### PGP security.txt

The private key and passphrase is stored in Bitwarden vault.

Command to encrypt and sign the `security-raw.txt` file to produce the
`security.txt` file which is published:

```sh
gpg \
    --local-user security@trivialsec.com \
    -o public/.well-known/security.txt \
    --clearsign src/security-raw.txt
```

Command to produce the `pgp-key.txt` file which is published:

```sh
gpg –export -a C0803193A7F98AEF745F812149E1CA2FB1E307D1 > public/pgp-key.txt
```

If you need to generate a new private key, and securely store it, use the
command `gpg --full-generate-key` and ensure the passphrase entered (when
prompted) and the produced public key (fingerprint) is recorded. Then export the
private key using the passphrase when prompted by this command
`gpg --export-secret-key -a <Fingerprint>` (replace fingerprint) and enter the
passhrase when prompted. Capture the exported private key and store it securely,
with the passphrase, and then ensure you update `security-raw.txt`, produce
`pgp-key.txt`, and finally encrypt and sign to produce the `security.txt` file
which is published.
