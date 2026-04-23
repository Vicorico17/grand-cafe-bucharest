# Grand Cafe Bucharest

Website/app for Grand Cafe Bucharest, a new restaurant opening in Casa Monteoru on Calea Victoriei in Bucharest.

Production domain: https://grandcafe.ro/

## Domain

The site is hosted on Vercel.

In the Vercel project, add both domains:

```text
grandcafe.ro
www.grandcafe.ro
```

Set `grandcafe.ro` as the primary production domain.

At ROTLD, set the domain nameservers to Vercel:

```text
ns1.vercel-dns.com
ns2.vercel-dns.com
```

After the nameserver change propagates, Vercel will manage the DNS records and issue the HTTPS certificates. Nameserver propagation can take up to 48 hours.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
