const policyArticles = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'data-collection', label: 'Data Collection' },
    { id: 'use-of-data', label: 'Use of Data' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'third-party-services', label: 'Third-party Services' },
    { id: 'your-rights', label: 'Your Rights' },
    { id: 'contact-us', label: 'Contact Us' },
];
const policyContent = [
    {
        id: 'introduction',
        title: 'Introduction',
        paragraphs: [
            "Welcome to ODOUR. We are committed to protecting your privacy and ensuring you have a positive experience on our website.",
            "This policy outlines how we collect, use, and safeguard your personal information when you visit our site, browse our collections, or make a purchase.",
        ],
    },
    {
        id: 'data-collection',
        title: 'Data Collection',
        paragraphs: [
            "We collect information you provide directly to us, such as your name, email address, shipping address, and payment details when you create an account or place an order.",
            "We also automatically collect certain information about your device and browsing behavior, including IP address, browser type, and pages visited, to help us improve our services.",
        ],
    },
    {
        id: 'use-of-data',
        title: 'Use of Data',
        paragraphs: [
            "The information we collect is used to process your orders, personalize your shopping experience, and communicate with you about your account or purchases.",
            "We may also use your data to send promotional offers and updates, which you can opt out of at any time.",
        ],
    },
    {
        id: 'cookies',
        title: 'Cookies',
        paragraphs: [
            "Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic.",
            "You can control or disable cookies through your browser settings, though some features of the site may not function properly without them.",
        ],
    },
    {
        id: 'third-party-services',
        title: 'Third-party Services',
        paragraphs: [
            "We may share your information with trusted third-party service providers who assist us with payment processing, shipping, and marketing.",
            "These partners are contractually obligated to protect your data and use it solely for the purposes we specify.",
        ],
    },
    {
        id: 'your-rights',
        title: 'Your Rights',
        paragraphs: [
            "You have the right to access, correct, or delete your personal information at any time by contacting us directly.",
            "You may also request a copy of the data we hold about you or withdraw consent for us to process it, subject to applicable law.",
        ],
    },
    {
        id: 'contact-us',
        title: 'Contact Us',
        paragraphs: [
            "If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out to our support team.",
            "We're happy to assist and address any concerns regarding your privacy and personal information.",
        ],
    },
];

const returnArticles = [
    { id: 'return-window', label: 'Return Window' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'how-to-return', label: 'How to Return' },
    { id: 'refunds', label: 'Refunds' },
    { id: 'exchanges', label: 'Exchanges' },
    { id: 'non-returnable', label: 'Non-Returnable Items' },
    { id: 'damaged-items', label: 'Damaged or Incorrect Items' },
    { id: 'contact-us', label: 'Contact Us' },
];

const returnContent = [
    {
        id: 'return-window',
        title: 'Return Window',
        paragraphs: [
            "You may request a return within 7 days of receiving your order, provided the item meets our eligibility criteria below.",
            "Requests made after this window cannot be accepted, as fragrance products are sensitive to handling and time.",
        ],
    },
    {
        id: 'eligibility',
        title: 'Eligibility',
        paragraphs: [
            "To be eligible for a return, items must be unused, unopened, and in their original packaging with seals intact.",
            "Due to hygiene and safety standards, opened or used fragrance bottles cannot be accepted for return under any circumstances.",
        ],
    },
    {
        id: 'how-to-return',
        title: 'How to Return',
        paragraphs: [
            "Contact our support team with your order number and reason for return to initiate the process.",
            "Once approved, pack the item securely in its original packaging and ship it to the address provided by our team. Return shipping costs are the responsibility of the customer unless the item arrived damaged or incorrect.",
        ],
    },
    {
        id: 'refunds',
        title: 'Refunds',
        paragraphs: [
            "Once we receive and inspect your returned item, we'll notify you of the approval status of your refund.",
            "Approved refunds are processed to your original payment method within 5–10 business days, depending on your bank or payment provider.",
        ],
    },
    {
        id: 'exchanges',
        title: 'Exchanges',
        paragraphs: [
            "We currently only replace items if they are defective, damaged, or incorrect. If you need a different fragrance or size, please initiate a return and place a new order.",
        ],
    },
    {
        id: 'non-returnable',
        title: 'Non-Returnable Items',
        paragraphs: [
            "Gift cards, sale/clearance items, and any opened or used fragrance products are not eligible for return or refund.",
        ],
    },
    {
        id: 'damaged-items',
        title: 'Damaged or Incorrect Items',
        paragraphs: [
            "If your order arrives damaged, leaking, or incorrect, please contact us within 48 hours of delivery with photos of the item and packaging.",
            "We'll arrange a replacement or full refund at no additional cost to you once the issue is verified.",
        ],
    },
    {
        id: 'contact-us',
        title: 'Contact Us',
        paragraphs: [
            "For any questions about returns, exchanges, or refunds, our support team is happy to help — reach out anytime.",
        ],
    },
];

export { policyArticles, policyContent, returnArticles, returnContent }
