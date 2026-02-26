import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const posts = [
  {
    slug: 'hoe-plak-ik-autobelettering',
    title: 'Hoe plak ik autobelettering? Stap voor stap uitgelegd',
    excerpt: 'Autobelettering zelf plakken is makkelijker dan je denkt. Met de juiste voorbereiding en onze tips krijg je een perfect resultaat zonder luchtbellen.',
    date: 'februari 2026',
    readTime: '4 min',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Tips voor belettering | BeletteringBestellen.nl</title>
        <meta name="description" content="Handige tips en uitleg over autobelettering, raamstickers en plakletters. Leer hoe je belettering zelf kunt plakken." />
        <link rel="canonical" href="https://beletteringbestellen.nl/blog" />
      </Helmet>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black mb-2">Blog</h1>
        <p className="text-muted-foreground mb-10">Tips, uitleg en inspiratie over belettering</p>

        <div className="space-y-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} lezen</span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-foreground">{post.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
              <span className="inline-block mt-4 text-primary text-sm font-semibold">Lees meer →</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
