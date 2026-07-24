import type { Config } from "@puckeditor/core";
import { Hero, type HeroProps } from "@/components/sections/Hero";
import { LabelStack, type LabelStackProps } from "@/components/sections/LabelStack";
import { Collection, type CollectionProps } from "@/components/sections/Collection";
import { Story, type StoryProps } from "@/components/sections/Story";
import { Sunnah, type SunnahProps } from "@/components/sections/Sunnah";
import { Faq, type FaqProps } from "@/components/sections/Faq";
import { Contact, type ContactProps } from "@/components/sections/Contact";
import { ImageBand, type ImageBandProps } from "@/components/sections/ImageBand";

type Props = {
  Hero: HeroProps;
  LabelStack: LabelStackProps;
  Collection: CollectionProps;
  Story: StoryProps;
  Sunnah: SunnahProps;
  Faq: FaqProps;
  Contact: ContactProps;
  ImageBand: ImageBandProps;
};

export const config: Config<{ components: Props }> = {
  components: {
    Hero: {
      label: "Top banner",
      fields: {
        arabic: { type: "text", label: "Arabic line (optional)" },
        arabicImage: {
          type: "text",
          label: "Arabic calligraphy image (optional — replaces the plain Arabic text)",
        },
        eyebrow: { type: "text", label: "Small line above the title" },
        title: { type: "text", label: "Big title" },
        titleAccent: { type: "text", label: "Golden last words of the title" },
        lead: { type: "textarea", label: "Intro paragraph" },
        primaryLabel: { type: "text", label: "Main button text" },
        primaryHref: { type: "text", label: "Main button link" },
        secondaryLabel: { type: "text", label: "Second button text" },
        secondaryHref: { type: "text", label: "Second button link" },
      },
      defaultProps: {
        arabic: "",
        arabicImage: "",
        eyebrow: "",
        title: "",
        titleAccent: "",
        lead: "",
        primaryLabel: "See the collection",
        primaryHref: "#collection",
        secondaryLabel: "Wholesale enquiries",
        secondaryHref: "#contact",
      },
      render: ({ puck: _p, editMode: _e, ...props }) => <Hero {...props} />,
    },
    LabelStack: {
      label: "The Standard (numbered promises)",
      fields: {
        kicker: { type: "text", label: "Small line above the heading" },
        title: { type: "text", label: "Heading" },
        promises: {
          type: "array",
          label: "Promises (numbered rows)",
          arrayFields: {
            title: { type: "text", label: "Label text (short, e.g. RAW & UNHEATED)" },
            text: { type: "textarea", label: "One-line explanation" },
            icon: {
              type: "select",
              label: "Icon",
              options: [
                { label: "Honey drop", value: "drop" },
                { label: "Mountains (origin)", value: "mountain" },
                { label: "Ship (import)", value: "ship" },
                { label: "Shield (purity)", value: "shield" },
              ],
            },
          },
          defaultItemProps: { title: "", text: "", icon: "drop" },
          getItemSummary: (item) => item.title || "New promise",
        },
      },
      defaultProps: {
        kicker: "The standard",
        title: "Bought at source. Sold with our name on it.",
        promises: [],
      },
      render: ({ puck: _p, editMode: _e, ...props }) => <LabelStack {...props} />,
    },
    Collection: {
      label: "Product collection",
      fields: {
        kicker: { type: "text", label: "Small script line above the heading" },
        title: { type: "text", label: "Giant outlined heading" },
        products: {
          type: "array",
          label: "Products",
          arrayFields: {
            name: { type: "text", label: "Product name" },
            tagline: { type: "text", label: "One-line description" },
            price: { type: "text", label: "Price text (e.g. £49 · 250g)" },
            ctaLabel: { type: "text", label: "Button text" },
            ctaHref: { type: "text", label: "Button link" },
            image: { type: "text", label: "Photo (e.g. /media/sidr-jar.jpg — leave empty for the drawn jar)" },
            look: {
              type: "select",
              label: "Panel colour",
              options: [
                { label: "Amber (honey)", value: "amber" },
                { label: "Night (black seed)", value: "night" },
                { label: "Olive (greens)", value: "olive" },
                { label: "Gold (gift)", value: "gold" },
              ],
            },
          },
          defaultItemProps: {
            name: "",
            tagline: "",
            price: "",
            ctaLabel: "Enquire",
            ctaHref: "#contact",
            image: "",
            look: "amber",
          },
          getItemSummary: (item) => item.name || "New product",
        },
      },
      defaultProps: { kicker: "", title: "", products: [] },
      render: ({ puck: _p, editMode: _e, ...props }) => <Collection {...props} />,
    },
    Story: {
      label: "Our story (cream panel)",
      fields: {
        kicker: { type: "text", label: "Small line above the heading" },
        title: { type: "text", label: "Heading" },
        paragraphs: {
          type: "array",
          label: "Paragraphs",
          arrayFields: { text: { type: "textarea", label: "Paragraph" } },
          defaultItemProps: { text: "" },
          getItemSummary: (item) => (item.text || "New paragraph").slice(0, 40),
        },
        stats: {
          type: "array",
          label: "Numbers row",
          arrayFields: {
            num: { type: "text", label: "Big number (e.g. 20+)" },
            label: { type: "text", label: "What it counts" },
          },
          defaultItemProps: { num: "", label: "" },
          getItemSummary: (item) => item.label || "New number",
        },
        image: { type: "text", label: "Photo on the right (e.g. /media/warehouse.jpg, optional)" },
        imageAlt: { type: "text", label: "Photo description (for accessibility)" },
      },
      defaultProps: { kicker: "", title: "", paragraphs: [], stats: [], image: "", imageAlt: "" },
      render: ({ puck: _p, editMode: _e, ...props }) => <Story {...props} />,
    },
    Sunnah: {
      label: "Quote band (Arabic + English)",
      fields: {
        arabic: { type: "textarea", label: "Arabic text" },
        english: { type: "textarea", label: "English translation" },
        reference: { type: "text", label: "Source reference" },
      },
      defaultProps: { arabic: "", english: "", reference: "" },
      render: ({ puck: _p, editMode: _e, ...props }) => <Sunnah {...props} />,
    },
    Faq: {
      label: "Questions & answers",
      fields: {
        title: { type: "text", label: "Heading" },
        items: {
          type: "array",
          label: "Questions",
          arrayFields: {
            question: { type: "text", label: "Question" },
            answer: { type: "textarea", label: "Answer" },
          },
          defaultItemProps: { question: "", answer: "" },
          getItemSummary: (item) => item.question || "New question",
        },
      },
      defaultProps: { title: "Questions, answered", items: [] },
      render: ({ puck: _p, editMode: _e, ...props }) => <Faq {...props} />,
    },
    ImageBand: {
      label: "Full-width photo band",
      fields: {
        image: { type: "text", label: "Photo (e.g. /media/honey-drizzle.jpg)" },
        alt: { type: "text", label: "Photo description (for accessibility)" },
        caption: { type: "text", label: "Small caption over the photo (optional)" },
      },
      defaultProps: { image: "", alt: "", caption: "" },
      render: ({ puck, editMode: _e, ...props }) =>
        !props.image && puck?.isEditing ? (
          <div
            style={{
              border: "2px dashed #c68a2a",
              borderRadius: 12,
              padding: "40px 20px",
              textAlign: "center",
              fontFamily: "sans-serif",
              color: "#6a5b47",
            }}
          >
            This photo band is invisible because no photo is set — add a path
            like /media/honey-drizzle.jpg in the panel on the right.
          </div>
        ) : (
          <ImageBand {...props} />
        ),
    },
    Contact: {
      label: "Contact / enquiry panel",
      fields: {
        kicker: { type: "text", label: "Small line above the heading" },
        title: { type: "text", label: "Heading" },
        text: { type: "textarea", label: "Paragraph" },
        primaryLabel: { type: "text", label: "Main button text" },
        primaryHref: { type: "text", label: "Main button link (mailto: or tel:)" },
        secondaryLabel: { type: "text", label: "Second button text" },
        secondaryHref: { type: "text", label: "Second button link" },
      },
      defaultProps: {
        kicker: "",
        title: "",
        text: "",
        primaryLabel: "",
        primaryHref: "",
        secondaryLabel: "",
        secondaryHref: "",
      },
      render: ({ puck: _p, editMode: _e, ...props }) => <Contact {...props} />,
    },
  },
  root: { fields: {}, render: ({ children }) => <main>{children}</main> },
};
