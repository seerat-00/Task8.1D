import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import exportfirebase from './firebase';
import './List.css';
import { Link } from 'react-router-dom';

const List = () => {
    const [item, setItem] = useState([]); 
    const [newItem, setNewItem] = useState({ type: 'question', title: '', tag: '', abstract: '' });
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(exportfirebase.postUpload, 'item'), (snapshot) => {
            const fetched_Items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItem(fetched_Items);
            setLoad(false); 
        }, (error) => {
            console.error("Error fetching items: ", error);
            setError("Failed to load items");
            setLoad(false);
        });

        return () => unsubscribe(); 
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(exportfirebase.postUpload, 'item'), {
                ...newItem,
                tag: newItem.tag.split(',').map(tag => tag.trim()),
                timestamp: new Date(),
            });
            setNewItem({ type: 'question', title: '', tag: '', date: '' }); 
        } catch (error) {
            setError('Error adding item: ');
            console.error(error.message)
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteDoc(doc(exportfirebase.postUpload, 'item', id));
        } catch (error) {
            setError('Error deleting item: ');
            console.error(error.message)
        }
    };

    const filteredItems = item.filter(items =>
        items.title.toLowerCase().includes(filter.toLowerCase()) ||
        items.tag.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    );

    if (load) return <p>Loading items...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="list">
            <h3>Find by Tag or Title </h3>
            <input
                type="text"
                placeholder="Filter by title or tag"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            <div className='container'>
                <div className="items">
                    {filteredItems.map(item => (
                        <div key={item.id} className="card">
                            <h4 onClick={() => setSelected(selected === item.id ? null : item.id)}>
                                {item.title}
                            </h4>
                            {selected === item.id && (
                                <div className="details">
                                    <p>{item.abstract}</p>
                                    <p>Type: {item.type}</p>
                                    <p>Tags: {item.tag.join(', ')}</p>
                                    <p>Date: {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}</p>
                                    <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleAddItem}>
                <select name='type' value={newItem.type} onChange={handleInputChange}>
                    <option value='question'>Question</option>
                    <option value='article'>Article</option>
                </select>
                <input
                    type='text'
                    name='title'
                    placeholder="Enter title"
                    value={newItem.title}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type='text' 
                    name='abstract'
                    placeholder="Enter abstract"
                    value={newItem.abstract}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type='text'
                    name='tag'
                    placeholder="Enter tags (comma-separated)"
                    value={newItem.tag}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Item</button>
                <span> 
                  <h5>Have some  difficulty in asking questions??
                  Click the button to see the questions asked by previous users?
                  </h5>
                      <Link to='/radio'>
                          <button type='button'>Go back</button>
                      </Link>
                </span>
              </form>
        </div>
    );
};

export default List;