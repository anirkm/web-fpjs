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
import useSwr from "swr";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

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
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "../ui/alert";
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

import { fetcher } from "@/lib/utils";

export default function AppealTab() {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshButtonLoading, setIsRefreshButtonLoading] = useState(false);
  const [submitError, setSubmitError] = useState<null | string>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const {
    data: data,
    error: error,
    isLoading: isLoading,
    isValidating: isValidating,
    mutate: mutate,
  } = useSwr("/api/appeal/user/", fetcher);

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

  if (isLoading || (isValidating && isRefreshButtonLoading))
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Appeal</CardTitle>
          <CardDescription>
            If you&apos;re banned from the server, you can appeal here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-10" />
          <Skeleton className="h-4 w-[37%]" />
          <Skeleton className="h-28" />
          <Skeleton className="h-3 w-[30%]" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9  w-[20%]" />
        </CardFooter>
      </Card>
    );

  if (error)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Appeal</CardTitle>
          <CardDescription>
            If you&apos;re banned from the server, you can appeal here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Alert>
            <AlertDescription>
              <div className="flex flex-col space-y-2 items-center">
                <Image
                  src="https://cdn.satanic.world/assets/oops.gif"
                  alt="logo"
                  width={64}
                  height={64}
                  className="mt-2 transition-transform hover:scale-[1.05]"
                />
                <p className="text-lg font-bold text-center">
                  Something went wrong while fetching your user data.
                </p>
                <div className="flex flex-col space-y-4 text-center items-center">
                  <p className="text-muted-foreground">
                    You can try again by clicking the button below or refreshing
                    the tab.
                  </p>
                  <Button
                    onClick={() => {
                      setIsRefreshButtonLoading(true);
                      mutate({}).then(() => {
                        setIsRefreshButtonLoading(false);
                      });
                    }}
                    className="w-[200px]"
                  >
                    {isRefreshButtonLoading && (
                      <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
                    )}
                    {isRefreshButtonLoading ? "Refreshing..." : "Refresh"}
                  </Button>
                  <p className="text-muted-foreground">
                    If you still encounter problems, contact a staff member.
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );

  if (!data.isBanned)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Appeal</CardTitle>
          <CardDescription>
            If you&apos;re banned from the server, you can appeal here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Alert>
            <AlertDescription>
              <div className="flex flex-col space-y-2 items-center">
                <Image
                  src="https://cdn.satanic.world/assets/dizzy.gif"
                  alt="logo"
                  width={64}
                  height={64}
                  className="mt-2 transition-transform hover:scale-[1.05]"
                />
                <p className="text-lg font-bold text-center">
                  You&apos;re not banned from the server.
                </p>
                <div className="flex flex-col space-y-4 text-center items-center">
                  <p className="text-muted-foreground mb-2">
                    You can only appeal if you&apos;re banned from the server.
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <p className="text-sm text-muted-foreground">
            If you&apos;re sure that you&apos;re banned from the server, and
            still cannot access the appeal form, well we can&rsquo;t do shit for
            you.
          </p>
        </CardFooter>
      </Card>
    );

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
