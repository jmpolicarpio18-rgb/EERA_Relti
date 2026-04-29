/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from './data';
import { MapPin, ChevronRight } from 'lucide-react';

type Project = (typeof projects)[number];

export default function Gallery({ filter }: { filter: string }) {
  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {filteredProjects.map((project: Project) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative card-editorial flex flex-col h-full"
          >
            <Link
              to={`/project/${project.key}`}
              aria-label={`View details for ${project.name}`}
              className="absolute inset-0 z-10 rounded-sm"
            />
            <div className="aspect-[4/5] overflow-hidden bg-slate-100 relative mb-6">
              <img
                src={`https://images.unsplash.com/photo-${project.id}?auto=format&fit=crop&w=800&q=80`}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-gold border border-gold/20">
                {project.status}
              </div>
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex items-center gap-1 text-gold text-[10px] font-bold uppercase tracking-widest mb-3">
                <MapPin size={12} />
                {project.location}
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-3">{project.name}</h3>
              <p className="text-navy/60 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                {project.description}
              </p>
              <div className="pt-4 border-t border-navy/5 flex justify-between items-center">
                <span className="text-[9px] font-bold text-navy/40 uppercase tracking-[0.2em]">{project.type}</span>
                <span className="flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-widest group-hover:text-gold transition-colors">
                  View Details <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </div>
  );
}
