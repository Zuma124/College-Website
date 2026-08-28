import { useState, useEffect } from "react";
import useLocalStorage from 'use-local-storage';

export default function useFetchSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [focusedSubject, setFocusedSubject] = useLocalStorage('focusedSubject', {});

  useEffect(() => {
    
    fetch('../public/electives.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setSubjects(data))
      .catch(error => console.error('Failed to fetch subjects:', error));
  }, []);

  return { subjects, focusedSubject, setFocusedSubject };
}