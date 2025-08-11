
import React from 'react';

const InstitutionalVideo = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Conheça nosso escritório
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Assista ao nosso vídeo institucional e descubra como podemos ajudar você
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/qYafoUPdklQ?si=4hhwuMAHU2xtLSIg"
              title="Vídeo Institucional - Lodi Advocacia"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalVideo;
