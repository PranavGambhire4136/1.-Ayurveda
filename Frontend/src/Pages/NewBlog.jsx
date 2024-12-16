import React, { useState } from 'react';

function NewBlog() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>NewBlog</h1>
      <form onSubmit={submitHandler}>
        <label>
          <div>Enter the Blog Title</div>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          <div>Blog Image</div>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }))}
          />
        </label>

        <label>
          <div>Enter the Blog Content</div>
          <textarea
            name="content"
            placeholder="Blog Content"
            required
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewBlog;