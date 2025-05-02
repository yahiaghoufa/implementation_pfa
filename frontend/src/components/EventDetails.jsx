import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div className="loading">Chargement...</div>;

  return (
    <div className="event-detail">
      <div className="event-header">
        <h1>{event.title}</h1>
        <Link to="/events" className="back-link">
          &larr; Retour aux événements
        </Link>
      </div>
      
      <div className="event-body">
        <img src={event.image} alt={event.title} className="main-image" />
        
        <div className="event-info">
          <div className="info-card">
            <h3>Détails de l'événement</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Lieu:</strong> {event.location}</p>
            <p><strong>Club organisateur:</strong> {event.club}</p>
          </div>
          
          <div className="event-description">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
        </div>
        
        <button className="register-btn">S'inscrire à l'événement</button>
      </div>
    </div>
  );
};

export default EventDetail;