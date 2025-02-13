"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

function getQueryParams(): Record<string, string> {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const params: Record<string, string> = {}
    urlParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }
  return {}
}

export default function CompareIPhones() {
  const router = useRouter()
  const [qualtricsParms, setQualtricsParms] = useState<Record<string, string>>({})

  useEffect(() => {
    // Store Qualtrics parameters on initial load
    setQualtricsParms(getQueryParams())
  }, [])

  const phones = [
    {
      name: "iPhone 16 Pro",
      shortName: "iPhone16Pro",
      buyParam: "16pro",
      image: "/iPhone-16-Pro.png",
      imageHeight: 256,
      price: "From $999 or $41.62/mo. for 24 mo.*",
      display: {
        label: "iPhone display",
        type: "Super Retina XDR display",
        tech: "ProMotion technology",
        extra: "Always-On display",
      },
    },
    {
      name: "iPhone 16",
      shortName: "iPhone16",
      buyParam: "16",
      image: "/iPhone-16.png",
      imageHeight: 248,
      price: "From $799 or $33.29/mo. for 24 mo.*",
      display: {
        label: "iPhone display",
        type: "Super Retina XDR display",
        tech: "❌ no ProMotion technology",
        extra: "❌ no Always-On display",
      },
    },
  ]

  const handleRedirect = (buyParam: string = '', exitValue: number = 0) => {
    // Construct URL with original and Qualtrics parameters
    const lmclicks = ''
    const moData = ''

    // Construct URL with existing Qualtrics parameters and new parameters
    const baseUrl = 'https://baylor.qualtrics.com/jfe/form/SV_cUs5YHREWAFwGSG/'
    const queryParams = new URLSearchParams({
      ...qualtricsParms,
      lmclicks: lmclicks,
      mo: moData,
      exit: exitValue.toString(),
      buy: buyParam
    })

    router.push(`${baseUrl}?${queryParams.toString()}`)
  }

  const handleTopImageClick = () => {
    handleRedirect('', 1)  // Pass exit=1 directly here
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="relative w-full" onClick={handleTopImageClick}>
        <Image 
          src="/topbrowser.png" 
          alt="Top browser" 
          layout="responsive" 
          width={1200} 
          height={300} 
          className="object-cover cursor-pointer"
        />
      </div>
      <div className="px-4 py-8 space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <Check className="w-6 h-6 mr-2 text-green-500" />
            <span className="text-base">Thank you for your order.</span>
            <span className="text-base text-blue-500 ml-2">View order confirmation</span>
          </div>
          <p className="text-base font-semibold mt-6"></p>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold">MODEL. Which is best for you?</h1>
          <p className="text-base mt-2">We would just like to assess which of the 2 iPhone models you currently think is best for you, whether that answer is the same as on the previous screen or not</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phones.map((phone, index) => (
            <div key={index} className="border rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center">{phone.name}</h2>
                <div className="flex flex-col">
                  <div className="relative" style={{ height: phone.imageHeight }}>
                    <Image src={phone.image || "/placeholder.svg"} alt={phone.name} fill className="object-contain" />
                  </div>
                  <div style={{ height: `${280 - phone.imageHeight}px` }} />
                </div>
                <p className="text-sm text-center">{phone.price}</p>
                <div className="space-y-1">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={() => handleRedirect(phone.buyParam)}
                  >
                    Select
                  </button>

                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}