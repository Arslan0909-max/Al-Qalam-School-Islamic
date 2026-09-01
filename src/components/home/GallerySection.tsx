import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ImageCard } from '../ui/ImageCard';
import { ScrollReveal } from '../ui/ScrollReveal';
import { GALLERY_ITEMS } from '../../constants/siteData';

export const GallerySection: React.FC = () => {
  return (
    <Section id="gallery" bg="warm-cream" withPattern={true} padding="normal">
      <Container>
        <ScrollReveal direction="up" delay={0}>
          <SectionHeading
            kicker="Life at Alqalam"
            title="Campus Life & Moments"
            subtitle="Glimpses into our vibrant learning spaces, Tahfeez sessions, scientific exploration, and moral activities."
            align="center"
            theme="light"
          />
        </ScrollReveal>

        {/* Gallery Grid with Soft Staggered Scroll In */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 50} duration={550}>
              <ImageCard
                src={item.image}
                alt={item.title}
                title={item.title}
                category={item.category}
                aspectRatio="landscape"
                className="transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};
