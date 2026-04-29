/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects } from './data';
import { ArrowLeft, MapPin, Check, Zap } from 'lucide-react';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.key === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl heading-serif text-navy mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gold text-white font-bold uppercase tracking-widest rounded-sm hover:bg-gold/90 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header with Back Button */}
      <div className="bg-navy text-white py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 hover:text-gold transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-bold uppercase tracking-widest text-sm">Back to Gallery</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-${project.id}?auto=format&fit=crop&w=1920&q=80`}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl heading-serif text-white mb-4">{project.title}</h1>
            <p className="text-xl text-white/80">{project.heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 bg-sand border-b border-navy/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-sm border border-navy/5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-navy/60 mb-2">Location</div>
              <div className="flex items-center gap-2 font-bold text-navy">
                <MapPin size={16} className="text-gold" />
                {project.location}
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-navy/5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-navy/60 mb-2">Type</div>
              <div className="font-bold text-navy">{project.type}</div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-navy/5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">Status</div>
              <div className="font-bold text-gold">{project.status}</div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-navy/5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-navy/60 mb-2">Category</div>
              <div className="font-bold text-navy">{project.category}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-4xl heading-serif text-navy mb-6">Project Overview</h2>
              <p className="text-navy/70 text-lg leading-relaxed">{project.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-3xl heading-serif text-navy mb-6">Key Highlights</h3>
              <div className="space-y-4">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <Check size={24} className="text-gold shrink-0 mt-1" />
                    <span className="text-navy/70 text-lg">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-3xl heading-serif text-navy mb-6">Project Details</h3>
              <div className="bg-sand p-8 rounded-sm border border-navy/5 space-y-4">
                {project.details.map((detail, idx) => (
                  <div key={idx} className="text-navy/70 leading-relaxed">
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Investment Info */}
          <aside className="space-y-6">
            <div className="bg-navy text-white p-8 rounded-sm sticky top-32">
              <h3 className="text-2xl heading-serif mb-6 text-gold">Investment Details</h3>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Minimum Lot Size</div>
                  <div className="text-2xl font-bold">{project.investmentInfo.minLot}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Maximum Lot Size</div>
                  <div className="text-2xl font-bold">{project.investmentInfo.maxLot}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Expected ROI</div>
                  <div className="text-lg font-bold text-gold">{project.investmentInfo.expectedROI}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Target Buyers</div>
                  <div className="text-sm text-white/80">{project.investmentInfo.targetBuyers}</div>
                </div>
              </div>

              <a
                href="/#contact"
                className="w-full px-6 py-4 bg-gold text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-gold/90 transition-all text-center block"
              >
                Inquire Now
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sand">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl heading-serif text-navy mb-6">Ready to Explore?</h2>
          <p className="text-lg text-navy/70 mb-8">Get in touch with our team to learn more about this exciting investment opportunity.</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-white font-bold uppercase tracking-widest rounded-sm hover:bg-gold/90 transition-all"
          >
            Send Inquiry <Zap size={18} />
          </a>
        </div>
      </section>
    </motion.div>
  );
}
