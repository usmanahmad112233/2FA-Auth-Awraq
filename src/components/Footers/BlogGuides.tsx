import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const BlogGuides = () => {
  return (
    <div className="mt-12 p-8 bg-slate-900 rounded-3xl text-white overflow-hidden relative">
      <div className="relative z-10">
        <h4 className="text-xl font-bold mb-2">Deep Dive into Security</h4>
        <p className="text-slate-400 text-sm mb-6 max-w-md">
          Explore our latest articles and in-depth guides on digital protection, privacy trends, and advanced security protocols.
        </p>
        <button className="flex items-center gap-2 text-brand-400 font-bold text-sm hover:gap-3 transition-all">
          Browse All Articles
          <ArrowRight size={16} />
        </button>
      </div>
      <BookOpen className="absolute -bottom-8 -right-8 text-white/5 w-48 h-48" />
    </div>
  );
};

export default BlogGuides;