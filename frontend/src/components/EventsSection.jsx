import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventsSection = () => {
  const [events] = useState([
    {
      id: 1,
      title: "Compétition de Programmation",
      date: "15 Mars 2024",
      location: "Amphi A1",
      description: "Participez à notre compétition annuelle de codage",
      image: "/event1.jpg",
      club: "Club Informatique"
    },
    {
      id: 2,
      title: "Forum Mathématique",
      date: "22 Avril 2024",
      location: "Espace Culturel",
      description: "Conférences et ateliers pratiques",
      image: "/event2.jfif",
      club: "Club Mathématiques"
    },
    {
      id: 3,
      title: "Journée Portes Ouvertes",
      date: "5 Mai 2024",
      location: "Campus Principal",
      description: "Découverte des activités des clubs",
      image: "/event3.jfif",
      club: "Bureau des Étudiants"
    }
  ]);

  return (
    <section className="events-section">
      <h2>Événements des Clubs</h2>
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-content">
              <h3>{event.title}</h3>
              <div className="event-meta">
                <p><i className="bi bi-calendar"></i> {event.date}</p>
                <p><i className="bi bi-geo-alt"></i> {event.location}</p>
              </div>
              <p className="event-description">{event.description}</p>
              <div className="event-footer">
                <span className="event-club">{event.club}</span>
                <Link to={`/events/${event.id}`} className="btn-event">
                  Voir détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;