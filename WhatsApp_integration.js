// WhatsApp Integration with Muggbot
// This file integrates the fashion store with WhatsApp for customer engagement

const axios = require('axios');

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

// Product Catalog for WhatsApp
const productCatalog = {
    categories:
