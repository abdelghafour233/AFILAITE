
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <article 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 flex flex-col group"
      onClick={() => onClick(post)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {post.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
          <span>{post.date}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-emerald-600 font-bold text-sm">
          <span>اقرأ المزيد</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
