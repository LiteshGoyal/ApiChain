import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaPaperPlane } from 'react-icons/fa';
import { Loader } from 'lucide-react';

const APIChainBuilder = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [createdPost, setCreatedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
            if (data.length > 0) {
                setSelectedUser(data[0].id);
            }
            setLoading(false);
        };
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const postsData = await response.json();
            setPosts(postsData);
        };
        fetchUsers();
        fetchPosts();
    }, []);
    const handlePostSubmit = async () => {
        if (!postTitle || !postBody) {
            alert('Please enter both title and body.');
            return;
        }
        setLoading(true);
        const existingPost = posts.find(post => post.title === postTitle);
        if (existingPost) {
            console.log('Post already exists:', existingPost);
            setCreatedPost(existingPost);
            fetchComments(existingPost.id);
        } else {
            const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: postTitle, body: postBody, userId: selectedUser }),
            });
            const postData = await postResponse.json();
            console.log('Created Post Data:', postData);
            setCreatedPost(postData);
            fetchComments(postData.id);
        }
        setLoading(false);
    };

    const fetchComments = async (postId) => {
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const commentsData = await commentsResponse.json();
        console.log('Parsed Comments Data:', commentsData);
        setComments(commentsData);
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center p-8">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-4">Build API Chain</h2>
                <label className="block mb-2 text-gray-700 flex items-center">
                    <FaUser className="mr-2" /> Select a User:
                </label>
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="border rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <label className="block mb-2 text-gray-700 flex items-center">
                    <FaEdit className="mr-2" /> Post Title:
                </label>
                <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="border rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="block mb-2 text-gray-700 flex items-center">
                    <FaEdit className="mr-2" /> Post Body:
                </label>
                <textarea
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    className="border rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handlePostSubmit}
                    className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition duration-200 w-full flex items-center justify-center"
                >
                    {loading ? <Loader className="animate-spin mr-2" /> : <FaPaperPlane className="mr-2" />}
                    Create Post & Fetch Comments
                </button>
            </div>

            {createdPost && (
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-3xl">
                    <h2 className="text-2xl font-semibold mb-4">Created Post:</h2>
                    <p><strong>Title:</strong> {createdPost.title}</p>
                    <p><strong>Body:</strong> {createdPost.body}</p>
                </div>
            )}

            {comments.length > 0 ? (
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-3xl">
                    <h2 className="text-2xl font-semibold mb-4">Fetched Comments:</h2>
                    {comments.map(comment => (
                        <div key={comment.id} className="border-b py-2">
                            <p><strong>{comment.name}</strong> ({comment.email})</p>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </div>
            ) : (
                createdPost && (
                    <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-3xl">
                        <h2 className="text-2xl font-semibold mb-4">Fetched Comments:</h2>
                        <p>No comments available.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default APIChainBuilder;
