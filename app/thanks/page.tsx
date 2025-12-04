"use client"
import "./css.css"
import IconMuis from "@/components/IconMuis"
import { PageLayout } from "@/components/PageLayout"
import Image from "next/image"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab"
import moment from "moment"
import { useEffect, useState } from "react"

export default function ThanksPage() {
  const orderPlacedTime = moment(Date.now()).format("hh:mm a")
  const orderPreparingStartTime = moment(Date.now())
    .add(10, "minutes")
    .format("hh:mm a")
  const orderDeliveryStartTime = moment(Date.now())
    .add(30, "minutes")
    .format("hh:mm a")
  const orderCompleteTime = moment(Date.now())
    .add(50, "minutes")
    .format("hh:mm a")

  const [currentStatus, setCurrentStatus] = useState<
    "preparing" | "delivering"
  >("preparing")

  const animation = {
    animation: "pulseHeightForOrderTimeline 1.5s ease-in-out infinite",
    bgcolor: "black",
    width: 2,
    flexGrow: 0,
  }

  return (
    <PageLayout>
      <div className="flex w-full justify-center">
        <div className="*:flex *:justify-center">
          <div className="flex justify-center">
            <div
              className="relative mb-4 h-48 w-48"
              style={{ animation: "imageMoving 2s ease-in-out infinite" }}
            >
              <Image src="/burger-icon.png" fill className="object-cover!" />
              {/* <IconMuis className="rounded-full! border text-9xl! text-green-500! font-bold!" iconName="check" /> */}
            </div>
          </div>
          <p className="text-2xl">We've received your order!</p>
        </div>
      </div>

      <div className="mt-8 flex w-full justify-center">
        <div className="w-full">
          <Timeline className="" position="alternate">
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {orderPreparingStartTime}
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector
                  className=""
                  sx={{ ...(currentStatus == "preparing" && animation) }}
                />
              </TimelineSeparator>

              <TimelineContent className="font-bold!">
                Let him cook
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {orderDeliveryStartTime}
              </TimelineOppositeContent>
              {/* <Sep /> */}

              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector
                  className=""
                  sx={{ ...(currentStatus == "delivering" && animation) }}
                />
              </TimelineSeparator>

              <TimelineContent className="font-bold!">
                On the way
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {orderCompleteTime}
              </TimelineOppositeContent>
              <TimelineDot />
              <TimelineContent className="font-bold!">
                At your doorstep
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </PageLayout>
  )
}

function Sep() {
  return (
    <TimelineSeparator>
      <TimelineDot />
      <TimelineConnector />
    </TimelineSeparator>
  )
}
