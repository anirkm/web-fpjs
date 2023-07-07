"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
const formSchema = z.object({
  message: z
    .string()
    .min(50, {
      message: "This field must contain at least 50 characters long",
    })
    .max(250, {
      message: "This field must contain at most 200 characters long",
    }),
  reason: z.string(),
});

export default function AppealTab() {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<null | string>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitError("Something went wrong, please try again later.");
    toast({
      title: "Appeal sent",
      description: `Data: ${JSON.stringify(values)}`,
    });
    setIsSubmitting(false);
    throw new Error("Something went wrong sentry tesst");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Appeal</CardTitle>
        <CardDescription>
          If you&apos;re banned from the server, you can appeal here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why are you banned ?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the reason of your ban." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pub">
                        Adversting another server.
                      </SelectItem>
                      <SelectItem value="blacklistedguild">
                        You&apos;re a staff member on a blacklisted guild
                      </SelectItem>
                      <SelectItem value="other">
                        Other (please specify)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why sould we unban you ?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why we should unban you"
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write the ban reason in detail, and why we should unban you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="hover:scale-[1.02] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
