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

const TOUR_PLAN_OPTIONS = [
  { id: 'mirissa-ella-short', name: 'Mirissa to Ella Tour' },
  { id: 'mirissa-ella-extended', name: 'Nuwara Eliya Tour' },
  { id: 'mirissa-nuwara-tour', name: 'Kandy Tour' },
  { id: 'custom-full-tour', name: 'Full Custom Tour (1-14 Places)' },
];

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [tourId, setTourId] = useState(TOUR_PLAN_OPTIONS[0].id);
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [visitedAt, setVisitedAt] = useState('');

  const selectedTourName = useMemo(
    () => TOUR_PLAN_OPTIONS.find((option) => option.id === tourId)?.name || '',
    [tourId]
  );

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  const formatDisplayDate = (dateValue: string) => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      return 'TR';
    }

    const first = words[0]?.[0] ?? '';
    const second = words[1]?.[0] ?? '';
    return `${first}${second}`.toUpperCase();
  };

  const fetchAllReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(getApiUrl('/reviews'));
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
    fetchAllReviews();
  }, []);

  useEffect(() => {
    if (!successMessage) {
      setShowSuccessToast(false);
      return;
    }

    setShowSuccessToast(true);
    const timer = window.setTimeout(() => {
      setShowSuccessToast(false);
      setSuccessMessage(null);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [successMessage]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = customerName.trim();
    const cleanComment = comment.trim();

    if (!tourId || !cleanName || !cleanComment) {
      setSuccessMessage(null);
      setError('Please fill in the tour plan, your name, and a comment.');
      return;
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setSuccessMessage(null);
      setError('Please select a rating from 1 to 5 stars.');
      return;
    }

    if (cleanComment.length < 5) {
      setSuccessMessage(null);
      setError('Please enter at least 5 characters for your review.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(getApiUrl('/reviews'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tourId,
          tourName: selectedTourName,
          customerName: cleanName,
          rating,
          comment: cleanComment,
          visitedAt: visitedAt || null,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || 'Could not add review');
      }

      const newReview = (await response.json()) as Review;
      setReviews((current) => [newReview, ...current]);

      setCustomerName('');
      setRating(0);
      setHoverRating(0);
      setComment('');
      setVisitedAt('');
      setSuccessMessage('Review saved successfully. Thank you for your feedback!');
    } catch (submitError) {
      console.error(submitError);
      const message = submitError instanceof Error ? submitError.message : 'Unable to submit your review.';
      setError(message);
      setSuccessMessage(null);
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = customerName.trim().length > 0 && comment.trim().length >= 5 && rating >= 1;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f6f8ff_0%,_#f2f5f7_45%,_#eef2f3_100%)] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {showSuccessToast && successMessage ? (
          <div className="fixed right-4 top-20 z-[90] w-[calc(100%-2rem)] max-w-sm rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-xl md:right-6 md:top-24">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-emerald-800">Success</p>
                <p className="mt-1 text-sm text-emerald-700">{successMessage}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessToast(false);
                  setSuccessMessage(null);
                }}
                className="text-emerald-700 hover:text-emerald-900"
                aria-label="Close success message"
              >
                ×
              </button>
            </div>
          </div>
        ) : null}

        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-lanka-green shadow-sm">
            Traveler Testimonials
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">Our Clients&apos; Feedback</h1>
          <p className="mt-3 text-sm text-slate-600 md:text-base">Real stories from travelers who explored Sri Lanka with CK Tours.</p>
        </div>

        <section className="mb-10 grid grid-cols-1 gap-4 rounded-3xl border border-white/70 bg-white/70 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:grid-cols-3 sm:p-6">
          <article className="rounded-2xl bg-white p-4 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Total Reviews</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{reviews.length}</p>
          </article>
          <article className="rounded-2xl bg-white p-4 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Average Rating</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{averageRating ? averageRating.toFixed(1) : '0.0'}</p>
          </article>
          <article className="rounded-2xl bg-white p-4 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Top Experience</p>
            <p className="mt-2 text-sm font-semibold text-lanka-green">Friendly Service & Safe Travel</p>
          </article>
        </section>

        <section className="mb-12 rounded-3xl border border-white/70 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.08)] md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Share Your Experience</h2>
          <p className="mt-1 text-sm text-slate-600">Tell us about your trip and help future travelers choose with confidence.</p>
          <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Tour Plan</label>
              <select
                value={tourId}
                onChange={(event) => setTourId(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-lanka-green focus:bg-white"
              >
                {TOUR_PLAN_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-lanka-green focus:bg-white"
                minLength={2}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Visit Date (Optional)</label>
              <input
                type="date"
                value={visitedAt}
                onChange={(event) => setVisitedAt(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-lanka-green focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Rating</label>
              <div className="flex items-center gap-1 pt-1">
                {[1, 2, 3, 4, 5].map((value) => {
                  const activeRating = hoverRating || rating;
                  const isActive = value <= activeRating;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`p-0.5 text-2xl leading-none transition-transform hover:scale-110 ${
                        isActive ? 'text-amber-400' : 'text-slate-300'
                      }`}
                      aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  );
                })}
                <span className="ml-2 text-xs text-slate-500">
                  {rating > 0 ? `${rating} / 5` : 'Select your rating'}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Your Review</label>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Write your review"
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-lanka-green focus:bg-white"
                minLength={5}
                required
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
              <div>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
              </div>
              <button
                type="submit"
                disabled={submitting || !isFormValid}
                className="rounded-full bg-gradient-to-r from-lanka-green to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Traveler Stories</h2>
              <p className="text-sm text-slate-600">See what guests are saying about their CK Tours experiences.</p>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-slate-500">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center text-slate-500">
              No reviews yet. Be the first traveler to share your story.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="group rounded-2xl border border-white/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.14)]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-lanka-green to-teal-700 text-sm font-bold text-white">
                      {getInitials(review.customerName)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{review.customerName}</p>
                      <p className="text-xs text-slate-500">{review.tourName}</p>
                    </div>
                  </div>

                  <p className="mb-3 text-base leading-relaxed text-slate-800">&quot;{review.comment}&quot;</p>

                  <div className="mb-3 text-sm font-bold text-amber-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span>{review.visitedAt ? `Visited ${formatDisplayDate(review.visitedAt)}` : 'Visit date not provided'}</span>
                    <span>Added {formatDisplayDate(review.createdAt)}</span>
                  </div>

                  <button
                    type="button"
                    className="mt-4 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white"
                  >
                    Traveler Story
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Reviews;
