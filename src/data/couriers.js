
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
    origin:
      "DPD's original parcel service began in Germany; it operates through a wider international network.",
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

// =========================
// COURIER-SPECIFIC FAQs
// =========================

const courierFaqs = {
  tcs: [
    {
      question: "How can I track a TCS parcel?",
      answer:
        "Enter your TCS tracking number in the TrackAllInOne tracking tool. The available tracking information will help you check the latest recorded progress of your shipment.",
    },
    {
      question: "Where can I find my TCS tracking number?",
      answer:
        "Check the booking receipt, shipment confirmation, or message provided by the sender. If you cannot locate the number, contact the sender or the TCS booking office.",
    },
    {
      question: "Why is my TCS tracking status not changing?",
      answer:
        "A shipment may not receive a new tracking scan at every stage of its journey. Updates can take time to appear. Check again later or consult TCS if the status remains unchanged.",
    },
    {
      question: "How can I get help with a delayed TCS shipment?",
      answer:
        "Review the latest tracking information first. For shipment-specific assistance, contact TCS through its official website and provide your tracking number.",
    },
  ],

  leopards: [
    {
      question: "How do I track a Leopards Courier parcel?",
      answer:
        "Enter the consignment number supplied by the sender into the TrackAllInOne tracking tool to check the available shipment updates.",
    },
    {
      question: "What is a Leopards consignment number?",
      answer:
        "It is the shipment reference used to identify and track a parcel. You can usually find it on the booking receipt or shipment confirmation.",
    },
    {
      question: "Why is my Leopards tracking information unavailable?",
      answer:
        "The shipment may not have been scanned into the tracking system yet, or the entered number may need checking. Confirm the consignment number and try again later.",
    },
    {
      question: "How can I ask Leopards about a delivery issue?",
      answer:
        "Use the official Leopards website or its customer support channels. Keep your consignment number available when asking about a shipment.",
    },
  ],

  blueex: [
    {
      question: "How can I check a BlueEx shipment?",
      answer:
        "Use the tracking tool on TrackAllInOne to check whether tracking information is available for your BlueEx shipment. You can also consult BlueEx's official website.",
    },
    {
      question: "Where can I get my BlueEx tracking number?",
      answer:
        "The sender or online store should provide the shipment reference after booking. Check your order confirmation or contact the seller if it is missing.",
    },
    {
      question: "Can I track a BlueEx cash-on-delivery order?",
      answer:
        "If the order has a BlueEx shipment reference and tracking information is available, you can use that reference to check its recorded progress.",
    },
    {
      question: "What should I do if my BlueEx parcel is delayed?",
      answer:
        "Check the latest available shipment information and contact the seller or BlueEx through its official contact page if you need further assistance.",
    },
  ],

  mp: [
    {
      question: "How do I track an M&P Courier shipment?",
      answer:
        "Use the shipment reference provided by the sender to check available tracking information through TrackAllInOne or M&P's official website.",
    },
    {
      question: "Where can I find my M&P tracking number?",
      answer:
        "Look for the tracking or consignment reference on your booking receipt, order confirmation, or message from the sender.",
    },
    {
      question: "Why is my M&P parcel not showing tracking updates?",
      answer:
        "Tracking information may take time to appear after a shipment is booked or scanned. Verify the reference number and check again later.",
    },
    {
      question: "Who should I contact about an M&P delivery problem?",
      answer:
        "For a shipment-specific issue, contact M&P through its official website and share the tracking reference so the team can identify the parcel.",
    },
  ],

  "pakistan-post": [
    {
      question: "How can I track a Pakistan Post parcel?",
      answer:
        "Use the article or tracking number provided when the item was booked. Enter it into the tracking tool or check the Pakistan Post official tracking service.",
    },
    {
      question: "What is a Pakistan Post article number?",
      answer:
        "An article number is a reference assigned to a postal item or shipment. It helps identify eligible items when checking their tracking progress.",
    },
    {
      question: "Why is my Pakistan Post tracking not updating?",
      answer:
        "Postal tracking updates depend on recorded scans and processing stages. Some stages may not generate an immediate update, so check again later.",
    },
    {
      question: "How can I get help with a Pakistan Post delivery?",
      answer:
        "Keep your article number and booking details ready, then contact Pakistan Post or visit an appropriate post office for shipment assistance.",
    },
  ],

  trax: [
    {
      question: "How can I track a Trax shipment?",
      answer:
        "Enter the shipment reference supplied by the sender or online store into TrackAllInOne to check available tracking information.",
    },
    {
      question: "Where can I find my Trax tracking number?",
      answer:
        "Check the order confirmation or shipping notification from the seller. If the reference was not provided, ask the seller for the Trax shipment number.",
    },
    {
      question: "Can I track a Trax cash-on-delivery order?",
      answer:
        "You can check the recorded shipment progress when the order has been booked with Trax and a valid tracking reference is available.",
    },
    {
      question: "What if my Trax shipment has no recent updates?",
      answer:
        "A new scan may not be available at every stage. Check the number again later and contact the seller or Trax through its official website if the delay continues.",
    },
  ],

  usps: [
    {
      question: "How can I track a USPS package?",
      answer:
        "Enter your USPS tracking number into TrackAllInOne to check the available shipment updates. You can also use the official USPS tracking service for carrier-specific information.",
    },
    {
      question: "Where can I find my USPS tracking number?",
      answer:
        "Look on your mailing receipt, shipping label, or shipment confirmation. If someone else sent the package, ask the sender to share the tracking number.",
    },
    {
      question: "What does In Transit mean for a USPS package?",
      answer:
        "In Transit generally indicates that the package is moving through the USPS delivery network. Check subsequent tracking updates for its latest recorded progress.",
    },
    {
      question: "Why has my USPS tracking not updated?",
      answer:
        "Tracking scans may not appear continuously while a package is travelling or being processed. Verify the number and check the official USPS tracking page if updates remain unavailable.",
    },
  ],

  fedex: [
    {
      question: "How do I track a FedEx package?",
      answer:
        "Enter your FedEx tracking number in TrackAllInOne to check available shipment events. For additional carrier-specific details, use the official FedEx tracking page.",
    },
    {
      question: "Where can I find my FedEx tracking number?",
      answer:
        "The number may appear on your shipping receipt, package confirmation email, or shipment notification from the sender.",
    },
    {
      question: "What does a FedEx delivery exception mean?",
      answer:
        "A delivery exception indicates that an unexpected event has affected the shipment's normal progress. Review the detailed tracking information for the explanation and any next steps.",
    },
    {
      question: "What should I do if my FedEx package is delayed?",
      answer:
        "Review the latest tracking events and estimated delivery information. If you need clarification about the shipment, contact FedEx through its official support channels.",
    },
  ],

  ups: [
    {
      question: "How can I track a UPS package?",
      answer:
        "Enter your UPS tracking number into TrackAllInOne to check available shipment updates. You can also consult the official UPS tracking page.",
    },
    {
      question: "Where can I find my UPS tracking number?",
      answer:
        "Check the shipping receipt, order confirmation, or notification from the sender. The sender can provide the number if it was not shared with you.",
    },
    {
      question: "What does UPS In Transit mean?",
      answer:
        "It generally means that UPS has recorded the package as moving through its delivery network. Further scans may provide more detail about its progress.",
    },
    {
      question: "Why is my UPS tracking not showing a new update?",
      answer:
        "A package may travel between facilities without an immediate new scan appearing online. Confirm the tracking number and check again later.",
    },
  ],

  dhl: [
    {
      question: "How do I track an international DHL shipment?",
      answer:
        "Enter the DHL tracking number into TrackAllInOne to check available shipment events. For detailed international shipment information, you can also use DHL's official tracking service.",
    },
    {
      question: "Where can I find my DHL tracking number?",
      answer:
        "Your tracking number is usually provided by the sender, online store, or shipping confirmation. Check the dispatch email or shipment receipt.",
    },
    {
      question: "Why is my DHL international shipment delayed?",
      answer:
        "International shipments can involve transportation, customs processing, and local delivery stages. Review the latest tracking events and contact DHL if you need shipment-specific clarification.",
    },
    {
      question: "What does customs clearance mean in DHL tracking?",
      answer:
        "It refers to the process of handling a shipment through the customs requirements of a country. The time required can vary depending on the destination and shipment documentation.",
    },
  ],

  aramex: [
    {
      question: "How can I track an Aramex shipment?",
      answer:
        "Enter your Aramex shipment reference in TrackAllInOne to check available tracking events. You can also use the official Aramex tracking website.",
    },
    {
      question: "Where can I find my Aramex tracking number?",
      answer:
        "Check the shipping confirmation, booking receipt, or message sent by the sender or online store.",
    },
    {
      question: "Why is my Aramex shipment status not changing?",
      answer:
        "Tracking updates depend on shipment scans and processing events. If no new information appears, verify the reference and check again later.",
    },
    {
      question: "How can I get assistance with an Aramex delivery?",
      answer:
        "Contact Aramex through its official website and provide your shipment reference and relevant delivery details.",
    },
  ],

  "sf-express": [
    {
      question: "How can I track an SF Express parcel?",
      answer:
        "Enter your SF Express tracking number into TrackAllInOne to check available shipment updates. You can also use the official SF Express website.",
    },
    {
      question: "Where can I find my SF Express tracking number?",
      answer:
        "The sender, seller, or shipping confirmation should provide the shipment reference. Check your order details if you cannot find it.",
    },
    {
      question: "Can I track an international SF Express shipment?",
      answer:
        "Tracking availability depends on the service and destination. Enter your shipment reference to see whether tracking information is available.",
    },
    {
      question: "Why has my SF Express parcel stopped updating?",
      answer:
        "International transportation and handovers between delivery partners may affect when new events appear. Check the official tracking service for the latest recorded information.",
    },
  ],

  "royal-mail": [
    {
      question: "How do I track a Royal Mail parcel?",
      answer:
        "Enter your Royal Mail tracking reference into TrackAllInOne to check available updates. Tracking availability depends on the service used for the item.",
    },
    {
      question: "Where can I find my Royal Mail tracking number?",
      answer:
        "Check the posting receipt, dispatch confirmation, or message from the sender. The sender can provide the reference if it is missing.",
    },
    {
      question: "What does Royal Mail tracking mean by an item being in transit?",
      answer:
        "It generally means the item is progressing through the postal or delivery network. Check later tracking events for further information.",
    },
    {
      question: "What should I do if Royal Mail tracking shows a delay?",
      answer:
        "Review the latest tracking details and any delivery information provided. If you need more help, contact Royal Mail through its official website.",
    },
  ],

  evri: [
    {
      question: "How can I track an Evri parcel?",
      answer:
        "Use the parcel tracking reference provided by the sender or retailer. Enter it into TrackAllInOne to check available shipment updates.",
    },
    {
      question: "Where can I find my Evri tracking number?",
      answer:
        "Check the retailer's dispatch email, order details, or shipping notification. Contact the retailer if the parcel reference has not been provided.",
    },
    {
      question: "Why is my Evri parcel tracking not updating?",
      answer:
        "A parcel may be awaiting its next scan or processing event. Confirm the tracking reference and check the official Evri tracking service again later.",
    },
    {
      question: "How can I check an Evri parcel delivery problem?",
      answer:
        "Review the latest tracking information first. For help with a particular parcel, use Evri's official support options and provide your tracking reference.",
    },
  ],

  "canada-post": [
    {
      question: "How can I track a Canada Post package?",
      answer:
        "Enter your Canada Post tracking number into TrackAllInOne to check available tracking events. You can also use the official Canada Post tracking service.",
    },
    {
      question: "Where can I find my Canada Post tracking number?",
      answer:
        "Look on your mailing receipt, shipping confirmation, or notification from the sender. Ask the sender if you do not have the number.",
    },
    {
      question: "Why is my Canada Post tracking not updating?",
      answer:
        "Not every stage of a parcel's journey produces an immediate tracking event. Check that the number is correct and review the official tracking page for updates.",
    },
    {
      question: "Can I track an international Canada Post parcel?",
      answer:
        "Tracking depends on the mailing service and destination. Enter the tracking number to see the information available for your shipment.",
    },
  ],

  "australia-post": [
    {
      question: "How do I track an Australia Post parcel?",
      answer:
        "Enter your tracking number into TrackAllInOne to check available shipment events. You can also check the official Australia Post tracking service.",
    },
    {
      question: "Where can I find my Australia Post tracking number?",
      answer:
        "Check your lodgement receipt, dispatch email, or order confirmation. If the item was sent by someone else, ask the sender for the reference.",
    },
    {
      question: "Why is my Australia Post parcel not showing updates?",
      answer:
        "Tracking information may take time to appear after a parcel is lodged or scanned. Verify the reference and check again later.",
    },
    {
      question: "Can I track an international Australia Post shipment?",
      answer:
        "Tracking availability varies according to the service and destination. Use the shipment reference to check the events currently available.",
    },
  ],

  "japan-post": [
    {
      question: "How can I track a Japan Post shipment?",
      answer:
        "Enter your Japan Post tracking number into TrackAllInOne to check available shipment information. The official Japan Post tracking service can provide additional details.",
    },
    {
      question: "Where can I find my Japan Post tracking number?",
      answer:
        "The reference is generally provided on the mailing receipt or by the sender. Check your shipping confirmation if you cannot locate it.",
    },
    {
      question: "Can Japan Post international parcels be tracked?",
      answer:
        "Tracking depends on the postal service selected and the destination country's handling arrangements. Check the available events using your tracking number.",
    },
    {
      question: "Why is my Japan Post tracking not updating?",
      answer:
        "There may be a gap between postal processing scans, particularly during international transportation or handover. Check again later and consult the official tracking service.",
    },
  ],

  "india-post": [
    {
      question: "How can I track an India Post parcel?",
      answer:
        "Use the consignment reference provided at booking. Enter it into TrackAllInOne or check the official India Post tracking service for available updates.",
    },
    {
      question: "What is an India Post consignment number?",
      answer:
        "It is the reference assigned to a postal article or parcel. It is used to identify eligible shipments when checking their tracking progress.",
    },
    {
      question: "Why is my India Post tracking status not updating?",
      answer:
        "Tracking events depend on postal scans and processing stages. If the status has not changed, verify the consignment number and check again later.",
    },
    {
      question: "Can I track an international India Post parcel?",
      answer:
        "Tracking availability depends on the postal service and destination. Some shipment events may also be recorded by the destination country's postal operator.",
    },
  ],

  "poste-italiane": [
    {
      question: "How can I track a Poste Italiane parcel?",
      answer:
        "Use the shipment reference provided by the sender to check available tracking information through TrackAllInOne or the official Poste Italiane website.",
    },
    {
      question: "Where can I find my Poste Italiane tracking code?",
      answer:
        "Check the shipping receipt, dispatch confirmation, or order notification. Contact the sender if the reference was not shared.",
    },
    {
      question: "Why is my Poste Italiane shipment not updating?",
      answer:
        "Tracking events may not appear continuously while an item is being processed or transported. Confirm the reference and check again later.",
    },
    {
      question: "Can I track an international Poste Italiane shipment?",
      answer:
        "Tracking availability depends on the service and destination. International shipments may also receive updates from the postal operator handling the item abroad.",
    },
  ],

  correos: [
    {
      question: "How can I track a Correos parcel?",
      answer:
        "Enter the shipment reference supplied by the sender into TrackAllInOne to check available tracking information. You can also consult the official Correos website.",
    },
    {
      question: "Where can I find my Correos tracking number?",
      answer:
        "Look in your shipping confirmation, order details, or posting receipt. If the parcel was sent by another person, request the reference from the sender.",
    },
    {
      question: "Why is my Correos parcel tracking not changing?",
      answer:
        "A parcel may be moving between facilities or awaiting another processing scan. Check the number and review the official tracking page again later.",
    },
    {
      question: "Can I track an international Correos shipment?",
      answer:
        "Tracking depends on the service and destination. Some international tracking events may be provided by the postal operator in the destination country.",
    },
  ],

  gls: [
    {
      question: "How can I track a GLS parcel?",
      answer:
        "Enter your GLS parcel number into TrackAllInOne to check available shipment updates. The relevant GLS country website may provide additional local tracking information.",
    },
    {
      question: "Where can I find my GLS parcel number?",
      answer:
        "Check the dispatch notification, order confirmation, or shipping information from the sender or retailer.",
    },
    {
      question: "Why does GLS tracking show no new information?",
      answer:
        "Tracking updates depend on scans recorded within the relevant GLS network. Confirm the parcel number and check the appropriate country-specific GLS service.",
    },
    {
      question: "Does GLS tracking work for international parcels?",
      answer:
        "Tracking availability depends on the countries and GLS services involved. Cross-border shipments may show additional events as the parcel moves between delivery networks.",
    },
  ],

  dpd: [
    {
      question: "How can I track a DPD parcel?",
      answer:
        "Enter your DPD parcel reference into TrackAllInOne to check available shipment events. For more specific information, use the DPD tracking service for the country handling your parcel.",
    },
    {
      question: "Where can I find my DPD tracking number?",
      answer:
        "Check the dispatch email, retailer's order page, or shipment notification. The sender can provide the parcel reference if you do not have it.",
    },
    {
      question: "Why does DPD tracking show a different country or delivery network?",
      answer:
        "DPD operates through country-specific networks and services. International shipments may be handled by different local operations as they move toward their destination.",
    },
    {
      question: "What should I do if my DPD parcel is delayed?",
      answer:
        "Review the latest tracking events and use the DPD website for the country handling your delivery. Contact the sender or relevant DPD support team if you need further assistance.",
    },
  ],
};

// Attach the matching FAQ list to each courier using its ID.
const couriersWithFaqs = couriers.map((courier) => ({
  ...courier,
  faqs: courierFaqs[courier.id] ?? [],
}));

export default couriersWithFaqs;
