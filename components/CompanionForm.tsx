"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
const formSchema = z.object({
    name: z.string().min(1 ,{message: 'Name is required'} ),
    subject: z.string().min(1 ,{message: 'subject is required'} ),
    topic: z.string().min(1 ,{message: 'topic is required'} ),
    voice: z.string().min(1 ,{message: 'voice is required'} ),
    style: z.string().min(1 ,{message: 'style is required'} ),
    duration: z.coerce.number().min(1 ,{message: 'duration is required'} ),
})


import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from 'react'
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companion.action"
import { redirect } from "next/navigation"
const CompanionForm = () => {
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit (values: z.infer<typeof formSchema>) {
    {/* Insert to Supabase */}

    const companion = await createCompanion(values);
    if(companion){
      redirect(`/companions/${companion.id}`)
    }else{
      console.log("Failed to create companion")
      redirect('/')
    }
  }
  return (
    <div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the companion name" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
              >
                <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                    {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                            {subject}
                        </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should this companion with?</FormLabel>
              <FormControl>
              <Textarea {...field} placeholder="Type your message here." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice Type</FormLabel>
              <Select 
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
              >
                <SelectTrigger className="input">
                    <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>                 
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <Select 
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
              >
                <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="formal">formal</SelectItem>
                    <SelectItem value="casual">casual</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimed session duration in minutes</FormLabel>
              <FormControl>
                <Input type="number" placeholder="15" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
      </form>
    </Form>
    </div>
  )
}

export default CompanionForm    