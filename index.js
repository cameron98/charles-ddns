const email = process.env.EMAIL;
const apiKey = process.env.API_KEY;
const zoneID = process.env.ZONE_ID;
const fqdn = process.env.FQDN;

if (email === undefined) {
  throw new Error("Cloudflare account email has not been provided.");
}
if (apiKey === undefined) {
  throw new Error("Cloudflare API key has not been provided.");
}
if (zoneID === undefined) {
  throw new Error("DNS Zone ID has not been provided.");
}
if (fqdn === undefined) {
  throw new Error("DNS records FQDN has not been provided.");
}

class DNSHandler {
  constructor(email, apiKey, zoneID, fqdn) {
    this.requestHeaders = new Headers([
      ["Content-Type", "application/json"],
      ["X-Auth-Email", email],
      ["Authorization", `Bearer ${apiKey}`],
    ]);
    this.fqdn = fqdn;
    this.zoneID = zoneID;
  }

  async getPublicIP() {
    return fetch("https://api.ipify.org?format=json")
      .then((resp) => resp.json())
      .then((result) => result.ip);
  }

  async getRecordID() {
    return fetch(
      `https://api.cloudflare.com/client/v4/zones/${this.zoneID}/dns_records?name=${fqdn}`,
      {
        headers: this.requestHeaders,
        method: "GET",
        cache: "no-cache",
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        return {
          record_id: resp.result[0].id,
          record_ip: resp.result[0].content,
        };
      });
  }

  async updateRecord(record_id, new_ip) {
    fetch(
      `https://api.cloudflare.com/client/v4/zones/${this.zoneID}/dns_records/${record_id}`,
      {
        method: "PATCH",
        headers: this.requestHeaders,
        body: JSON.stringify({
          content: new_ip,
          name: this.fqdn,
          type: "A",
          id: record_id,
        }),
      }
    ).then((resp) => console.log(resp.status));
  }

  async run() {
    const publicIP = await app.getPublicIP();
    console.log(`My Public IP: ${publicIP}`);
    const recordData = await app.getRecordID();
    await app.updateRecord(recordData.record_id, publicIP);
  }
}

const app = new DNSHandler(email, apiKey, zoneID, fqdn);
app.run();
const timer = setInterval(app.run, 300000);
