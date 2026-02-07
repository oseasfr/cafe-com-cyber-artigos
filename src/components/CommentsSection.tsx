import React from 'react';

interface CommentsSectionProps {
  articleId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId }) => {
  return (
    <div className="mt-12 p-6 rounded-lg border border-border bg-muted/20">
      <h3 className="text-xl font-bold mb-4">Comentários</h3>
      <p className="text-muted-foreground">A seção de comentários está em desenvolvimento para o artigo: {articleId}</p>
    </div>
  );
};

export default CommentsSection;
