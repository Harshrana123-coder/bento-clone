import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import axios from 'axios';
import { CgGitFork } from 'react-icons/cg';
import { AiFillStar } from 'react-icons/ai';

import coffee from '@/assets/coffee.svg';
import dribble from '@/assets/dribble.svg';
import github from '@/assets/github.svg';
import linkedin from '@/assets/linkedin.svg';
import twitter from '@/assets/twitter.svg';
import youtube from '@/assets/youtube.svg';
import instagram from '@/assets/instagram.svg';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage({ forks, stars }) {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const features = featuresRef.current;
    const testimonials = testimonialsRef.current;
    const cta = ctaRef.current;

    // ✅ FIX: prevent crash
    if (!hero || !features || !testimonials || !cta) return;

    const h1 = hero.querySelector('h1');
    const p = hero.querySelector('p');
    const a = hero.querySelector('a');

    if (h1) {
      gsap.fromTo(h1, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    }

    if (p) {
      gsap.fromTo(p, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.8 });
    }

    if (a) {
      gsap.fromTo(a, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.1 });
    }

    const featureCards = features.querySelectorAll('.feature-card');
    if (featureCards.length) {
      gsap.fromTo(featureCards, { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: features,
          start: 'top 80%',
        },
      });
    }

    const testimonialCards = testimonials.querySelectorAll('.testimonial-card');
    if (testimonialCards.length) {
      gsap.fromTo(testimonialCards, { opacity: 0, scale: 0.9 }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonials,
          start: 'top 80%',
        },
      });
    }

    const ctaHeading = cta.querySelector('h2');
    const ctaBtn = cta.querySelector('a');

    if (ctaHeading) {
      gsap.fromTo(ctaHeading, { opacity: 0, y: 30 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cta,
          start: 'top 80%',
        },
      });
    }

    if (ctaBtn) {
      gsap.fromTo(ctaBtn, { opacity: 0, scale: 0.9 }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: cta,
          start: 'top 80%',
        },
      });
    }

  }, []);

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Bento - Elevate Your Online Presence</title>
        <meta name="description" content="Bento platform" />
      </Head>

      <main className="max-w-[1280px] mx-auto">
        <HeroSection ref={heroRef} />
        <FeaturesSection ref={featuresRef} />
        <TestimonialsSection ref={testimonialsRef} />
        <CTASection ref={ctaRef} />
        <Footer />
        <ForkStar forks={forks} stars={stars} />
      </main>
    </div>
  );
}

/* KEEP YOUR COMPONENTS SAME BELOW (Hero, Features, etc.) */

/* ---------- FIXED DATA FETCH ---------- */
export async function getStaticProps() {
  try {
    const response = await axios.get(
      'https://api.github.com/repos/Harshrana123-coder/bento-clone'
    );

    return {
      props: {
        forks: response.data.forks_count,
        stars: response.data.stargazers_count,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: {
        forks: 0,
        stars: 0,
      },
      revalidate: 3600,
    };
  }
}