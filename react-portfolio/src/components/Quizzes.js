import React from 'react';

const Quizzes = () => {
  const quizzes = [
    {
      id: 1,
      title: 'JavaScript Quiz',
      description: 'Test your JavaScript knowledge with fundamental concepts.',
      icon: 'fab fa-js-square',
      color: '#F7DF1E',
      link: '#'
    },
    {
      id: 2,
      title: 'Web Dev Quiz',
      description: 'Challenge yourself with HTML, CSS and web basics.',
      icon: 'fas fa-code',
      color: '#6366f1',
      link: '#'
    },
    {
      id: 3,
      title: 'React Quiz',
      description: 'Evaluate your understanding of React concepts.',
      icon: 'fab fa-react',
      color: '#61DAFB',
      link: '#'
    }
  ];

  return (
    <section id="quizzes" className="quizzes-section">
      <div className="container">
        <h2 className="section-title">Quizzes</h2>
        <p className="section-subtitle">Test your knowledge</p>
        <div className="quizzes-grid">
          {quizzes.map((quiz) => (
            <article key={quiz.id} className="quiz-card">
              <div className="quiz-icon" style={{ color: quiz.color }}>
                <i className={quiz.icon}></i>
              </div>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <a href={quiz.link} className="quiz-link">
                <span>Start Quiz</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quizzes;
