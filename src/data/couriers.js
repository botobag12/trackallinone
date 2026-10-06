const couriers = [
  // =========================
  // PAKISTAN
  // =========================

  {
    id: "tcs",
    name: "TCS",
    country: "Pakistan",
    trackingUrl:
      "https://www.tcsexpress.com/track/{trackingNumber}",
    method: "url",
  },

  {
    id: "leopards",
    name: "Leopards Courier",
    country: "Pakistan",
    trackingUrl:
      "https://pk.leopardscourier.com/tracking?cn_number={trackingNumber}",
    method: "url",
  },

  {
    id: "blueex",
    name: "BlueEx",
    country: "Pakistan",
    trackingUrl: "https://www.blue-ex.com/",
    method: "manual",
  },

  {
    id: "mp",
    name: "M&P Courier",
    country: "Pakistan",
    trackingUrl: "https://www.mulphilog.com/",
    method: "manual",
  },

  {
    id: "pakistan-post",
    name: "Pakistan Post",
    country: "Pakistan",
    trackingUrl: "https://ep.gov.pk/",
    method: "manual",
  },

  {
    id: "trax",
    name: "Trax",
    country: "Pakistan",
    trackingUrl: "https://trax.pk/",
    method: "manual",
  },

  // =========================
  // UNITED STATES
  // =========================

  {
    id: "usps",
    name: "USPS",
    country: "United States",
    trackingUrl: "https://tools.usps.com/go/TrackAction",
    method: "manual",
  },

  {
    id: "fedex",
    name: "FedEx",
    country: "United States",
    trackingUrl: "https://www.fedex.com/en-us/tracking.html",
    method: "manual",
  },

  {
    id: "ups",
    name: "UPS",
    country: "United States",
    trackingUrl: "https://www.ups.com/track",
    method: "manual",
  },

  // =========================
  // INTERNATIONAL
  // =========================

  {
    id: "dhl",
    name: "DHL",
    country: "International",
    trackingUrl:
      "https://www.dhl.com/global-en/home/tracking.html",
    method: "manual",
  },

  {
    id: "aramex",
    name: "Aramex",
    country: "International",
    trackingUrl: "https://track.aramex.com/",
    method: "manual",
  },

  {
    id: "sf-express",
    name: "SF Express",
    country: "China / International",
    trackingUrl: "https://www.sf-express.com/",
    method: "manual",
  },

  // =========================
  // UNITED KINGDOM
  // =========================

  {
    id: "royal-mail",
    name: "Royal Mail",
    country: "United Kingdom",
    trackingUrl:
      "https://www.royalmail.com/portal/rm/track?trackNumber={trackingNumber}",
    method: "url",
  },

  {
    id: "evri",
    name: "Evri",
    country: "United Kingdom",
    trackingUrl: "https://www.evri.com/track-a-parcel",
    method: "manual",
  },

  {
    id: "dpd-uk",
    name: "DPD",
    country: "United Kingdom",
    trackingUrl: "https://www.dpd.co.uk/apps/tracking/",
    method: "manual",
  },

  // =========================
  // CANADA
  // =========================

  {
    id: "canada-post",
    name: "Canada Post",
    country: "Canada",
    trackingUrl:
      "https://www.canadapost-postescanada.ca/track-reperage/en",
    method: "manual",
  },

  // =========================
  // AUSTRALIA
  // =========================

  {
    id: "australia-post",
    name: "Australia Post",
    country: "Australia",
    trackingUrl: "https://auspost.com.au/track",
    method: "manual",
  },

  // =========================
  // JAPAN
  // =========================

  {
    id: "japan-post",
    name: "Japan Post",
    country: "Japan",
    trackingUrl:
      "https://trackings.post.japanpost.jp/services/srv/search/?locale=en",
    method: "manual",
  },

  // =========================
  // INDIA
  // =========================

  {
    id: "india-post",
    name: "India Post",
    country: "India",
    trackingUrl:
      "https://www.indiapost.gov.in/NSDefault.htm",
    method: "manual",
  },

  // =========================
  // ITALY
  // =========================

  {
    id: "poste-italiane",
    name: "Poste Italiane",
    country: "Italy",
    trackingUrl: "https://www.poste.it/",
    method: "manual",
  },

  // =========================
  // SPAIN
  // =========================

  {
    id: "correos",
    name: "Correos",
    country: "Spain",
    trackingUrl: "https://www.correos.es/",
    method: "manual",
  },

  // =========================
  // EUROPE
  // =========================

  {
    id: "gls",
    name: "GLS",
    country: "Europe",
    trackingUrl: "https://track.gls-group.com/",
    method: "manual",
  },

  {
    id: "dpd",
    name: "DPD",
    country: "Europe",
    trackingUrl: "https://www.dpd.com/",
    method: "manual",
  },
];

export default couriers;