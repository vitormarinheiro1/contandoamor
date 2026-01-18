"use client"

import { useEffect, useState } from "react"

interface TimeCounterProps {
  startDate: string
}

interface TimeElapsed {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeElapsed(startDate: string): TimeElapsed {
  const start = new Date(startDate)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes--
  }
  if (minutes < 0) {
    minutes += 60
    hours--
  }
  if (hours < 0) {
    hours += 24
    days--
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
    months--
  }
  if (months < 0) {
    months += 12
    years--
  }

  return { years, months, days, hours, minutes, seconds }
}

export function TimeCounter({ startDate }: TimeCounterProps) {
  const [time, setTime] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      setTime(calculateTimeElapsed(startDate))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [startDate])

  if (!mounted) {
    return (
      <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center rounded-xl bg-card/50 p-4 backdrop-blur-sm">
            <div className="h-10 w-16 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-12 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  const timeUnits = [
    { value: time.years, label: "Anos" },
    { value: time.months, label: "Meses" },
    { value: time.days, label: "Dias" },
    { value: time.hours, label: "Horas" },
    { value: time.minutes, label: "Minutos" },
    { value: time.seconds, label: "Segundos" },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
      {timeUnits.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-xl bg-card/50 p-4 backdrop-blur-sm border border-border/50"
        >
          <span className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {unit.value.toString().padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
