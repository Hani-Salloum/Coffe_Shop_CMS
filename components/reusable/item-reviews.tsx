//@ts-nocheck
import { Review } from '@/types/review'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { MessageSquareText, Star } from 'lucide-react'

interface Props {
    reviews: Array<Review>
}

function ItemReviews({ reviews }: Props) {
  return (
    <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id} className="bg-white rounded-3xl border-0 p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < review.rate ? "fill-[#caa378] text-[#caa378]" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[#493831]/70">{review.created_at}</span>
                    </div>
                    <p className="text-lg font-semibold text-[#493831] mb-2">
                      {review.email.split("@")[0].slice(0, 3)}***@{review.email.split("@")[1]}
                    </p>
                    <p className="text-[#493831]/80 leading-relaxed">{review.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-0bg-white rounded-3xl shadow-lg p-8 text-center">
                <CardContent className="flex flex-col items-center justify-center gap-4">
                  <MessageSquareText className="w-16 h-16 text-[#caa378]" />
                  <h2 className="text-2xl font-bold text-[#493831]">No reviews yet for this item!</h2>
                  <p className="text-[#493831]/80">Be the first to share your experience.</p>
                </CardContent>
              </Card>
            )}
          </div>
  )
}

export default ItemReviews