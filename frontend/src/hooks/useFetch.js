// // import{useState,useEffect} from 'react'

// // const useFetch=(url)=>{
// //     const [data,setData]=useState([])
// //     const [error,setError]=useState(null)
// //     const [loading,setLoading]=useState(false)

// //     useEffect(()=>{
// //         const fetchData=async()=>{
// //             setLoading(true)

// //             try {
// //                 const res=await fetch(url)
// //                 if(!res.ok){
// //                     setError('failed to fetch')
// //                     alert('failed to fetch')
// //                 }
// //                 const result=await res.json()
// //                 setData(result.data)
// //                 setLoading(false);
// //             } catch (err) {
// //                 setError(err.message)
// //                 setLoading(false);
// //             }
// //         };
// //         fetchData()
// //     },[url])

// //     return{
// //         data,
// //         error,
// //         loading
// //     }
// // }

// // export default useFetch;

// import { useState, useEffect } from 'react';

// const useFetch = (url) => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(url);
//         const result = await res.json();

//         if (!res.ok) {
//           throw new Error(result.message || 'Failed to fetch');
//         }

//         setData(result.data); // Make sure your backend returns data under 'data' key
//         console.log('Fetched data:', result.data); // Debug log
//       } catch (err) {
//         setError(err.message);
//         console.error('Fetch error:', err); // Debug log
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return {
//     data,
//     error,
//     loading,
//   };
// };

// export default useFetch;
// import { useState, useEffect, useCallback } from 'react';

// const useFetch = (url) => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(url);
//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.message || 'Failed to fetch');
//       }

//       setData(result.data);
//       console.log('Fetched data:', result.data);
//       setError(null); // Clear any previous errors on success
//     } catch (err) {
//       setError(err.message);
//       console.error('Fetch error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [url]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return {
//     data,
//     error,
//     loading,
//     refetch: fetchData, // Now exposing the fetch function
//   };
// };

// export default useFetch;

import { useState, useEffect, useCallback } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // or sessionStorage

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // attach token if available
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch');
      }

      setData(result.data);
      console.log('Fetched data:', result.data);
      setError(null); // Clear any previous errors on success
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    loading,
    refetch: fetchData,
  };
};

export default useFetch;

