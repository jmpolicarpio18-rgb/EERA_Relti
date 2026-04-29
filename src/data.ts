/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import residentialImage from './Commercial.jpg';
import ecoLifestyleImage from './eco-lifestyle.jpg';
import subicBayLotsImage from './subic-Bay_Lots.jpg';

export const projects = [
  {
    id: '1512917774080-9991f1c4c750',
    key: 'residential',
    image: residentialImage,
    name: 'San Antonio Beach Estate',
    title: 'San Antonio Beach Estate',
    location: 'San Antonio, Zambales',
    type: 'Residential Beachside Lots',
    category: 'Residential',
    status: 'Planning Stage',
    description: 'A premium coastal residential development designed for vacation homes, rental properties, and long-term land investment in San Antonio, Zambales.',
    heroDescription: 'Experience the ultimate beachside living with our premier residential community in San Antonio. Designed for families seeking vacation homes, retirees looking for a peaceful retreat, and investors capitalizing on high-appreciation potential.',
    details: [
      '📍 Location: San Antonio, Zambales',
      '🏡 Ideal for: Vacation homes & retirement properties',
      '📈 Investment: High appreciation potential',
      '🌊 Feature: Walking distance to beach areas',
      '🚧 Status: Planning Stage'
    ],
    highlights: [
      'Premium beachfront access',
      'Diverse lot sizes (250 sqm - 1,500 sqm)',
      'Tourism-ready location',
      'Strong appreciation potential'
    ],
    investmentInfo: {
      minLot: '250 sqm',
      maxLot: '1,500 sqm+',
      expectedROI: 'High (5-10 year horizon)',
      targetBuyers: 'Families, retirees, investors'
    }
  },
  {
    id: '1510798831971-661eb04b3739',
    key: 'eco',
    image: ecoLifestyleImage,
    name: 'Botolan Coastal Reserve',
    title: 'Botolan Coastal Reserve',
    location: 'Botolan, Zambales',
    type: 'Eco-Lifestyle Development',
    category: 'Eco-Lifestyle',
    status: 'Concept Development',
    description: 'A nature-first coastal project that integrates open spaces, greenery, and sustainable development concepts for a relaxed and eco-conscious lifestyle.',
    heroDescription: 'Immerse yourself in sustainable coastal living with Botolan Coastal Reserve. This nature-integrated development combines pristine natural beauty with thoughtfully designed spaces for eco-conscious families and retreat seekers.',
    details: [
      '📍 Location: Botolan, Zambales',
      '🌿 Focus: Sustainable and low-density development',
      '🏕 Ideal for: Retreat homes & eco-tourism',
      '🌊 Feature: Natural coastal landscape',
      '🚧 Status: Concept Development'
    ],
    highlights: [
      'Sustainable development practices',
      'Low-density community design',
      'Pristine natural landscape',
      'Eco-tourism opportunities'
    ],
    investmentInfo: {
      minLot: '500 sqm',
      maxLot: '2,000 sqm+',
      expectedROI: 'Moderate-High (7-12 year horizon)',
      targetBuyers: 'Eco-conscious families, retreat developers'
    }
  },
  {
    id: '1486406146924-c4d0016aae41',
    key: 'commercial',
    image: subicBayLotsImage,
    name: 'Subic Bay Gateway Lots',
    title: 'Subic Bay Gateway Lots',
    location: 'Near Subic Bay, Zambales',
    type: 'Commercial / Investment Lots',
    category: 'Commercial',
    status: 'Open for Inquiry',
    description: 'Strategically located lots near Subic\'s tourism and commercial corridor, ideal for business establishments, resorts, and mixed-use developments.',
    heroDescription: 'Tap into the booming tourism corridor with Subic Bay Gateway Lots. Strategically positioned near major commercial hubs, these lots offer exceptional opportunity for hospitality, retail, and mixed-use developments.',
    details: [
      '📍 Location: Near Subic Bay, Zambales',
      '🏢 Ideal for: Resorts, retail, and commercial use',
      '📊 Investment: High-growth commercial zone',
      '🚗 Accessibility: Near major highways and ports',
      '🚧 Status: Open for Inquiry'
    ],
    highlights: [
      'Prime commercial corridor location',
      'Proximity to Subic tourism hub',
      'High foot traffic potential',
      'Multi-use development ready'
    ],
    investmentInfo: {
      minLot: '1,000 sqm',
      maxLot: '5,000+ sqm',
      expectedROI: 'Very High (3-7 year horizon)',
      targetBuyers: 'Hotels, resorts, retail chains, developers'
    }
  }
];
