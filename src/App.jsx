
import './App.css'
import React from 'react';
import useBlogStorage from './useBlogStorage';

const BlogPost = ({ title, content, date }) => (
  <div className="blog-post">
    <h2>{title}</h2>
    <p className="date">{date}</p>
    <p>{content}</p>
  </div>
);

const NewPostForm = ({ onAddPost }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      onAddPost(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <h2>Add New Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter post content"
        required
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

const App = () => {
  const { posts, addPost } = useBlogStorage();

  return (
    <div className="container">
      <h1>My Learning Blog</h1>
      <div>
        {posts.map((post) => (
          <BlogPost key={post.id} {...post} />
        ))}
      </div>
      <NewPostForm onAddPost={addPost} />
    </div>
  );
};

export default App;