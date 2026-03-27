import React, { useEffect, useMemo, useState } from 'react';
import { getApiUrl } from '../services/api';

interface Review {
  id: number;
  tourId: string;
  tourName: string;
  customerName: string;
  rating: number;
  comment: string;
  visitedAt: string | null;
  createdAt: string;
}

interface TourReviewsProps {
  tourId: string;
  tourName: string;
}

const STAR_VALUES = [1, 2, 3, 4, 5];

const TourReviews: React.FC<TourReviewsProps> = ({ tourId, tourName }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [visitedAt, setVisitedAt] = useState('');

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  const loadReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${getApiUrl('/reviews')}?tourId=${encodeURIComponent(tourId)}`);
      if (!response.ok) {
        throw new Error('Could not load reviews');
      }

      const data = (await response.json()) as Review[];
      setReviews(data);
    } catch (loadError) {
      console.error(loadError);
      setError('Unable to load reviews. Please make sure the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [tourId]);

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!customerName.trim() || !comment.trim()) {
      setError('Please fill in both your name and review.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(getApiUrl('/reviews'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tourId,
          tourName,
          customerName: customerName.trim(),
          rating,
          comment: comment.trim(),
          visitedAt: visitedAt || null,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || 'Could not submit review');
      }

      const newReview = (await response.json()) as Review;
      setReviews((current) => [newReview, ...current]);
      setCustomerName('');
      setRating(5);
      setComment('');
      setVisitedAt('');
    } catch (submitError) {
      console.error(submitError);
      const message = submitError instanceof Error ? submitError.message : 'Unable to submit review.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-8 border-t border-slate-200 pt-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900 text-base md:text-lg">Customer Reviews</h3>
          <p className="text-sm text-slate-600">Feedback submitted by real travelers for this tour.</p>
        </div>
        <div className="rounded-xl bg-lanka-sand px-4 py-2 text-right">
          <p className="text-xs text-slate-500">Average Rating</p>
          <p className="font-bold text-lanka-green">
            {reviews.length ? `${averageRating.toFixed(1)} / 5` : 'No ratings yet'}
          </p>
        </div>
      </div>

      <form onSubmit={submitReview} className="mb-6 grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-4 md:grid-cols-2">
        <input
          type="text"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          placeholder="Your name"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-lanka-green"
          required
        />

        <input
          type="date"
          value={visitedAt}
          onChange={(event) => setVisitedAt(event.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-lanka-green"
        />

        <div className="md:col-span-2">
          <p className="mb-2 text-sm font-medium text-slate-700">Rating</p>
          <div className="flex items-center gap-2">
            {STAR_VALUES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`rounded-md px-3 py-1 text-sm font-semibold transition-colors ${
                  value <= rating ? 'bg-lanka-green text-white' : 'bg-white text-slate-600 border border-slate-300'
                }`}
              >
                {value}★
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Share your experience..."
          rows={4}
          className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-lanka-green"
          required
        />

        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-2">
          {error ? <p className="text-sm text-red-600">{error}</p> : <span />}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-lanka-green px-4 py-2 text-sm font-bold text-white transition-opacity disabled:opacity-60"
          >
            {submitting ? 'Submitting...' : 'Add Review'}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-slate-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-slate-500">No reviews yet. Be the first to review this tour.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{review.customerName}</p>
                <p className="text-sm font-medium text-lanka-green">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
              </div>
              <p className="mb-2 text-sm text-slate-700">{review.comment}</p>
              <p className="text-xs text-slate-500">
                {review.visitedAt ? `Visited: ${review.visitedAt} | ` : ''}
                Added: {new Date(review.createdAt).toLocaleString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TourReviews;
