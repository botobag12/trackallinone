const couriers = [
  // =========================
  // PAKISTAN
  // =========================
  {
    id: "tcs",
    name: "TCS",
    country: "Pakistan",
    origin: "Pakistan",
    coverage:
      "Pakistan, with international shipping available for supported destinations.",
    services: [
      "Domestic parcel delivery",
      "Express shipping",
      "International shipping",
      "E-commerce logistics",
    ],
    overview:
      "TCS is a Pakistan-based courier and logistics company serving individuals and businesses with domestic delivery and international shipping options.",
    trackingUrl: "https://www.tcsexpress.com/track/{trackingNumber}",
    officialUrl: "https://www.tcsexpress.com/",
    method: "url",
  },
  {
    id: "leopards",
    name: "Leopards Courier",
    country: "Pakistan",
    origin: "Pakistan",
    coverage:
      "Nationwide Pakistan coverage and international shipping to supported destinations.",
    services: [
      "Domestic delivery",
      "Express services",
      "Cash on delivery",
      "E-commerce logistics",
      "International shipping",
    ],
    overview:
      "Leopards Courier is a Pakistan-based delivery company offering parcel transportation for individuals, retailers, and online businesses.",
    trackingUrl:
      "https://pk.leopardscourier.com/tracking?cn_number={trackingNumber}",
    officialUrl: "https://pk.leopardscourier.com/",
    contactUrl: "https://ecom.leopardscourier.com/locate_us",
    method: "url",
  },
  {
    id: "blueex",
    name: "BlueEx",
    country: "Pakistan",
    origin: "Pakistan",
    coverage:
      "Pakistan, with selected international and cross-border logistics services.",
    services: [
      "E-commerce delivery",
      "Cash on delivery",
      "Warehousing",
      "Cross-border logistics",
    ],
    overview:
      "BlueEx is a Pakistan-based logistics company known for e-commerce delivery and services for online retailers.",
    trackingUrl: "https://www.blue-ex.com/",
    officialUrl: "https://www.blue-ex.com/",
    contactUrl: "https://www.blue-ex.com/contact",
    method: "manual",
  },
  {
    id: "mp",
    name: "M&P Courier",
    country: "Pakistan",
    origin: "Pakistan",
    coverage:
      "Pakistan, with international shipping options depending on the service.",
    services: [
      "Courier delivery",
      "Express shipping",
      "Logistics",
      "E-commerce services",
    ],
    overview:
      "M&P is a Pakistani courier and logistics provider serving individuals and businesses. Available services depend on the shipment and destination.",
    trackingUrl: "https://www.mulphilog.com/",
    officialUrl: "https://www.mulphilog.com/",
    method: "manual",
  },
  {
    id: "pakistan-post",
    name: "Pakistan Post",
    country: "Pakistan",
    origin: "Pakistan",
    coverage:
      "Pakistan and international postal destinations supported by its postal services.",
    services: [
      "Letters",
      "Parcels",
      "Postal services",
      "International mail",
    ],
    overview:
      "Pakistan Post is the country's national postal operator. It handles mail and parcel services through its postal network, including eligible international shipments.",
    trackingUrl: "https://ep.gov.pk/",
    officialUrl: "https://www.pakpost.gov.pk/",
    method: "manual",
  },
  {
    id: "trax",
    name: "Trax",
    country: "Pakistan",
    origin: "Pakistan",
    coverage:
      "Primarily Pakistan; confirm international availability directly with the company.",
    services: [
      "E-commerce delivery",
      "Cash on delivery",
      "Last-mile logistics",
      "Business shipping",
    ],
    overview:
      "Trax is a Pakistan-based logistics company that supports parcel delivery and e-commerce operations for businesses.",
    trackingUrl: "https://trax.pk/",
    officialUrl: "https://trax.pk/",
    method: "manual",
  },

  // =========================
  // UNITED STATES
  // =========================
  {
    id: "usps",
    name: "USPS",
    country: "United States",
    origin: "United States",
    coverage:
      "United States and international destinations supported by USPS services.",
    services: [
      "Letters",
      "Domestic parcels",
      "Priority Mail",
      "International mail",
    ],
    overview:
      "The United States Postal Service is the national postal operator of the United States. Its website provides mailing information and tracking for eligible shipments.",
    trackingUrl: "https://tools.usps.com/go/TrackAction",
    officialUrl: "https://www.usps.com/",
    method: "manual",
  },
  {
    id: "fedex",
    name: "FedEx",
    country: "United States",
    origin: "United States",
    coverage:
      "United States and many international markets, subject to service availability.",
    services: [
      "Express delivery",
      "Ground shipping",
      "Freight",
      "International shipping",
    ],
    overview:
      "FedEx is a US-origin transportation and logistics company providing parcel delivery and shipping services for individuals and businesses.",
    trackingUrl: "https://www.fedex.com/en-us/tracking.html",
    officialUrl: "https://www.fedex.com/",
    method: "manual",
  },
  {
    id: "ups",
    name: "UPS",
    country: "United States",
    origin: "United States",
    coverage:
      "United States and international markets served by UPS, depending on the service.",
    services: [
      "Parcel delivery",
      "Express shipping",
      "Freight",
      "International logistics",
    ],
    overview:
      "UPS is a US-origin package delivery and supply-chain company. Its tracking tools let customers check shipment progress using a tracking number.",
    trackingUrl: "https://www.ups.com/track",
    officialUrl: "https://www.ups.com/",
    method: "manual",
  },

  // =========================
  // INTERNATIONAL
  // =========================
  {
    id: "dhl",
    name: "DHL",
    country: "International",
    origin: "Founded in the United States; headquartered in Germany",
    coverage:
      "International network spanning numerous countries and territories; availability varies by service.",
    services: [
      "International express",
      "Parcel delivery",
      "Freight",
      "Supply-chain logistics",
    ],
    overview:
      "DHL began in the United States and is part of DHL Group, headquartered in Germany. It provides international express, freight, parcel, and logistics services.",
    trackingUrl: "https://www.dhl.com/global-en/home/tracking.html",
    officialUrl: "https://www.dhl.com/",
    contactUrl:
      "https://www.dhl.com/pk-en/home/express/help-and-support/contact-dhl-express.html",
    method: "manual",
  },
  {
    id: "aramex",
    name: "Aramex",
    country: "International",
    origin: "Jordan",
    coverage:
      "International network across the Middle East and other global markets; exact coverage depends on service.",
    services: [
      "International shipping",
      "Express delivery",
      "Freight",
      "E-commerce logistics",
    ],
    overview:
      "Aramex was founded in Jordan and is headquartered in the United Arab Emirates. It provides international transportation and logistics services.",
    trackingUrl: "https://track.aramex.com/",
    officialUrl: "https://www.aramex.com/",
    method: "manual",
  },
  {
    id: "sf-express",
    name: "SF Express",
    country: "China / International",
    origin: "China",
    coverage:
      "China and selected international markets served by SF's logistics network.",
    services: [
      "Express parcels",
      "International shipping",
      "Freight",
      "Supply-chain logistics",
    ],
    overview:
      "SF Express is a China-origin logistics company offering express parcel delivery and transportation services within China and selected international markets.",
    trackingUrl: "https://www.sf-express.com/",
    officialUrl: "https://www.sf-express.com/",
    method: "manual",
  },

  // =========================
  // UNITED KINGDOM
  // =========================
  {
    id: "royal-mail",
    name: "Royal Mail",
    country: "United Kingdom",
    origin: "United Kingdom",
    coverage:
      "United Kingdom and international destinations supported by Royal Mail's postal services.",
    services: [
      "Letters",
      "Parcels",
      "Tracked delivery",
      "International mail",
    ],
    overview:
      "Royal Mail is a UK postal and delivery provider offering letter and parcel services, including tracking options for eligible shipments.",
    trackingUrl:
      "https://www.royalmail.com/portal/rm/track?trackNumber={trackingNumber}",
    officialUrl: "https://www.royalmail.com/",
    method: "url",
  },
  {
    id: "evri",
    name: "Evri",
    country: "United Kingdom",
    origin: "United Kingdom",
    coverage:
      "United Kingdom and selected international destinations, depending on the service.",
    services: [
      "Parcel delivery",
      "Tracked parcels",
      "Returns",
      "International parcel services",
    ],
    overview:
      "Evri is a UK parcel delivery company serving consumers and businesses. Tracking details are available through its official parcel-tracking service.",
    trackingUrl: "https://www.evri.com/track-a-parcel",
    officialUrl: "https://www.evri.com/",
    method: "manual",
  },

  // =========================
  // CANADA
  // =========================
  {
    id: "canada-post",
    name: "Canada Post",
    country: "Canada",
    origin: "Canada",
    coverage:
      "Canada and international destinations available through Canada Post mailing services.",
    services: [
      "Letters",
      "Domestic parcels",
      "Tracked shipping",
      "International mail",
    ],
    overview:
      "Canada Post is Canada's national postal operator, offering mailing, parcel delivery, and tracking services for eligible shipments.",
    trackingUrl:
      "https://www.canadapost-postescanada.ca/track-reperage/en",
    officialUrl: "https://www.canadapost-postescanada.ca/",
    method: "manual",
  },

  // =========================
  // AUSTRALIA
  // =========================
  {
    id: "australia-post",
    name: "Australia Post",
    country: "Australia",
    origin: "Australia",
    coverage:
      "Australia and international destinations supported by Australia Post services.",
    services: [
      "Letters",
      "Domestic parcels",
      "Express Post",
      "International shipping",
    ],
    overview:
      "Australia Post is Australia's national postal operator. Customers can use its online tools to check eligible parcel and mail deliveries.",
    trackingUrl: "https://auspost.com.au/track",
    officialUrl: "https://auspost.com.au/",
    method: "manual",
  },

  // =========================
  // JAPAN
  // =========================
  {
    id: "japan-post",
    name: "Japan Post",
    country: "Japan",
    origin: "Japan",
    coverage:
      "Japan and international postal destinations supported by Japan Post.",
    services: [
      "Postal mail",
      "Domestic parcels",
      "International parcels",
      "Registered mail",
    ],
    overview:
      "Japan Post provides postal and parcel services in Japan and handles eligible international mail and parcels through its postal network.",
    trackingUrl:
      "https://trackings.post.japanpost.jp/services/srv/search/?locale=en",
    officialUrl: "https://www.post.japanpost.jp/index_en.html",
    method: "manual",
  },

  // =========================
  // INDIA
  // =========================
  {
    id: "india-post",
    name: "India Post",
    country: "India",
    origin: "India",
    coverage:
      "India and international postal destinations supported by India Post.",
    services: [
      "Postal mail",
      "Parcel services",
      "Speed Post",
      "International mail",
    ],
    overview:
      "India Post is India's national postal operator. Its postal network supports mail and parcel services, with tracking available for eligible items.",
    trackingUrl: "https://www.indiapost.gov.in/NSDefault.htm",
    officialUrl: "https://www.indiapost.gov.in/",
    method: "manual",
  },

  // =========================
  // ITALY
  // =========================
  {
    id: "poste-italiane",
    name: "Poste Italiane",
    country: "Italy",
    origin: "Italy",
    coverage:
      "Italy and international destinations supported by its postal and parcel services.",
    services: [
      "Postal services",
      "Parcel delivery",
      "Express shipping",
      "International shipping",
    ],
    overview:
      "Poste Italiane is Italy's national postal operator and provides postal, parcel, and other services. Delivery options vary by shipment and destination.",
    trackingUrl: "https://www.poste.it/",
    officialUrl: "https://www.poste.it/",
    method: "manual",
  },

  // =========================
  // SPAIN
  // =========================
  {
    id: "correos",
    name: "Correos",
    country: "Spain",
    origin: "Spain",
    coverage:
      "Spain and international destinations supported by Correos postal services.",
    services: [
      "Letters",
      "Parcel delivery",
      "Express shipping",
      "International mail",
    ],
    overview:
      "Correos is Spain's national postal operator. Its services include postal delivery and parcels, with tracking options for eligible shipments.",
    trackingUrl: "https://www.correos.es/",
    officialUrl: "https://www.correos.es/",
    method: "manual",
  },

  // =========================
  // EUROPE / INTERNATIONAL
  // =========================
  {
    id: "gls",
    name: "GLS",
    country: "Europe",
    origin: "Germany",
    coverage:
      "Multiple European countries and selected international markets, depending on the local GLS network.",
    services: [
      "Parcel delivery",
      "Business shipping",
      "Cross-border parcels",
      "Logistics",
    ],
    overview:
      "GLS is an international parcel delivery group with a strong European network. Available services and tracking tools depend on the country handling the shipment.",
    trackingUrl: "https://track.gls-group.com/",
    officialUrl: "https://gls-group.com/",
    method: "manual",
  },
  {
    id: "dpd",
    name: "DPD",
    country: "Europe / United Kingdom",
    origin: "DPD's original parcel service began in Germany; it operates through a wider international network.",
    coverage:
      "DPD operates across multiple European markets, including the United Kingdom. Services, tracking pages, and delivery options vary by country.",
    services: [
      "Domestic parcel delivery",
      "International parcel delivery",
      "Business shipping",
      "Cross-border logistics",
    ],
    overview:
      "DPD is an international parcel delivery network serving consumers and businesses across multiple countries. Because DPD services are organised by market, customers should select the appropriate country-specific website for tracking, delivery options, and local support.",
    trackingUrl: "https://www.dpd.com/",
    officialUrl: "https://www.dpd.com/",
    regionalLinks: [
      {
        label: "DPD UK — Tracking and Services",
        url: "https://www.dpd.co.uk/apps/tracking/",
      },
      {
        label: "DPD Europe / International",
        url: "https://www.dpd.com/",
      },
    ],
    method: "manual",
  },
];

export default couriers;
