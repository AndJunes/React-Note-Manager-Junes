import { useEffect, useState } from 'react';
import axios from 'axios';

const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tags'); // ajustá si usás proxy
        setTags(response.data);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};

export default useTags;
