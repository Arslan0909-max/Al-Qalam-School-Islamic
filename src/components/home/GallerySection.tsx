import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ImageCard } from '../ui/ImageCard';
import { ScrollReveal } from '../ui/ScrollReveal';
import { GALLERY_ITEMS } from '../../constants/siteData';
import { useLanguage } from '../../context/LanguageContext';

export const GallerySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section id="gallery" bg="warm-cream" withPattern={true} padding="normal">
      <Container>
        <ScrollReveal direction="up" delay={0}>
          <SectionHeading
            kicker={t.gallery.kicker}
            title={t.gallery.title}
            subtitle={t.gallery.subtitle}
            align="center"
            theme="light"
          />
        </ScrollReveal>

        {/* Gallery Grid with Soft Staggered Scroll In */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => {
            const translatedItem = t.gallery.items[idx] || {
              title: item.title,
              category: item.category,
            };

            return (
              <ScrollReveal key={item.id} direction="up" delay={idx * 50} duration={550}>
                <ImageCard
                  src={item.image}
                  alt={translatedItem.title}
                  title={translatedItem.title}
                  category={translatedItem.category}
                  aspectRatio="landscape"
                  className="transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
                />
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
