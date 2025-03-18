import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutPerson extends Schema.Component {
  collectionName: 'components_about_people';
  info: {
    displayName: 'person';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    job: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface AboutScene extends Schema.Component {
  collectionName: 'components_about_scenes';
  info: {
    displayName: 'scene';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    gallery: Attribute.Media & Attribute.Required;
    documents: Attribute.Component<'documents.advanced-document', true>;
    description: Attribute.RichText & Attribute.Required;
  };
}

export interface AboutSocial extends Schema.Component {
  collectionName: 'components_about_socials';
  info: {
    displayName: 'social';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<
      ['vk', 'telegram', 'instagram', 'odnoklassniki']
    > &
      Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface AboutTextBlock extends Schema.Component {
  collectionName: 'components_about_text_blocks';
  info: {
    displayName: 'TextBlock';
    description: '';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    button: Attribute.Enumeration<['none', 'table_booking']> &
      Attribute.Required &
      Attribute.DefaultTo<'none'>;
  };
}

export interface ContactContact extends Schema.Component {
  collectionName: 'components_contact_contacts';
  info: {
    displayName: 'Contact';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    contact: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['text', 'email', 'phone']> &
      Attribute.DefaultTo<'text'>;
  };
}

export interface CorporateEventPassport extends Schema.Component {
  collectionName: 'components_corporate_event_passports';
  info: {
    displayName: 'EventPassport';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    document: Attribute.Media & Attribute.Required;
  };
}

export interface CorporateWorker extends Schema.Component {
  collectionName: 'components_corporate_workers';
  info: {
    displayName: 'Worker';
    description: '';
  };
  attributes: {
    worker: Attribute.Relation<
      'corporate.worker',
      'oneToOne',
      'api::worker.worker'
    >;
    role: Attribute.String;
  };
}

export interface DocumentsAdvancedDocument extends Schema.Component {
  collectionName: 'components_documents_advanced_documents';
  info: {
    displayName: 'AdvancedDocument';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    file: Attribute.Media & Attribute.Required;
  };
}

export interface EventRole extends Schema.Component {
  collectionName: 'components_event_roles';
  info: {
    displayName: 'role';
    description: '';
  };
  attributes: {
    role: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
  };
}

export interface EventTicket extends Schema.Component {
  collectionName: 'components_event_tickets';
  info: {
    displayName: 'ticket';
    description: '';
  };
  attributes: {
    date: Attribute.DateTime & Attribute.Required;
    paid: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    title: Attribute.String & Attribute.Required & Attribute.Private;
    link: Attribute.String & Attribute.Required;
  };
}

export interface FooterPartners extends Schema.Component {
  collectionName: 'components_footer_partners';
  info: {
    displayName: 'partner';
    description: '';
  };
  attributes: {
    link: Attribute.String;
    image: Attribute.Media;
  };
}

export interface NewsSource extends Schema.Component {
  collectionName: 'components_news_sources';
  info: {
    displayName: 'source';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    link: Attribute.String;
    publish_date: Attribute.Date;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    keywords: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.person': AboutPerson;
      'about.scene': AboutScene;
      'about.social': AboutSocial;
      'about.text-block': AboutTextBlock;
      'contact.contact': ContactContact;
      'corporate.event-passport': CorporateEventPassport;
      'corporate.worker': CorporateWorker;
      'documents.advanced-document': DocumentsAdvancedDocument;
      'event.role': EventRole;
      'event.ticket': EventTicket;
      'footer.partners': FooterPartners;
      'news.source': NewsSource;
      'seo.seo': SeoSeo;
    }
  }
}
