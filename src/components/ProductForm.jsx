import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function ProductForm({ onSuccess }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        api.get("/getCategories").then(res => setCategories(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("name", name);
        form.append("description", description);
        form.append("price", price);
        form.append("categoryId", categoryId);
        form.append("weight", weight);
        form.append("age", age);
        if (image) form.append("image", image);

        await api.post("/addProducts", form);
        onSuccess?.();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="input" required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="input" required />
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="input" required />
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="input" required>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input type="file" onChange={e => setImage(e.target.files[0])} className="input" />
            <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (optional)" className="input" />
            <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age (optional)" className="input" />
            <button type="submit" className="btn-primary w-full">Add Product</button>
        </form>
    );
}
