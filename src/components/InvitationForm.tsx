"use client";

import { useState, useTransition } from "react";
import { submitInvitation } from "@/lib/actions";

function AttendanceField({ isPending }: { isPending: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        出席の可否 *
      </label>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="attendance"
            value="attending"
            required
            disabled={isPending}
            className="mr-2"
          />
          出席します
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="attendance"
            value="not_attending"
            required
            disabled={isPending}
            className="mr-2"
          />
          欠席します
        </label>
      </div>
    </div>
  );
}

export default function InvitationForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);

    startTransition(async () => {
      const result = await submitInvitation(formData);

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    });
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">送信完了</h2>
          <p className="text-gray-600">
            ご回答ありがとうございます。
            <br />
            お返事をお待ちしております。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        結婚式への招待状
      </h2>

      <form action={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            お名前 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メールアドレス *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <AttendanceField isPending={isPending} />

        <div>
          <label
            htmlFor="guest_count"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            参加人数
          </label>
          <select
            id="guest_count"
            name="guest_count"
            defaultValue={1}
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}名
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="dietary_restrictions"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            食物アレルギー・食事制限
          </label>
          <textarea
            id="dietary_restrictions"
            name="dietary_restrictions"
            rows={3}
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="特にない場合は空欄で構いません"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メッセージ
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="お祝いのメッセージをお聞かせください"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "送信中..." : "送信する"}
        </button>
      </form>
    </div>
  );
}
