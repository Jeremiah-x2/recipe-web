"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Pen } from "lucide-react";
import { Button } from "../ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import CircleLoader from "react-spinners/CircleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "../ui/textarea";

export function EditUsername() {
  const [username, setUsername] = useState<string>();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  async function updateUsername() {
    console.log("Updating username...");
    setIsUpdating(true);
    try {
      const currentUser = auth.currentUser?.uid;
      const userRef = doc(db, `users`, currentUser!);
      const updateUserDoc = await updateDoc(userRef, { username: username });
      router.refresh();
      console.log(updateUserDoc);
    } catch (error) {
      toast.error("An Error occured");
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Pen />
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pen size={18} />
              </TooltipTrigger>
              <TooltipContent>Edit username</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit username</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter username"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <Button
            className="bg-primary100 text-white font-semibold disabled:bg-primary80"
            onClick={updateUsername}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                Updating...
                <CircleLoader size={20} />{" "}
              </>
            ) : (
              "Update"
            )}
          </Button>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export function EditBio() {
  const [bio, setBio] = useState<string>();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  async function updateUsername() {
    console.log("Updating username...");
    setIsUpdating(true);
    try {
      const currentUser = auth.currentUser?.uid;
      const userRef = doc(db, `users`, currentUser!);
      const updateUserDoc = await updateDoc(userRef, { bio });
      router.refresh();
      console.log(updateUserDoc);
    } catch (error) {
      toast.error("An Error occured");
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pen size={18} />
              </TooltipTrigger>
              <TooltipContent>Edit Bio</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <Pen />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter bio"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setBio(e.target.value)
            }
          ></Textarea>
          <Button
            className="bg-primary100 text-white font-semibold disabled:bg-primary80"
            onClick={updateUsername}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                Updating...
                <CircleLoader size={20} />{" "}
              </>
            ) : (
              "Update"
            )}
          </Button>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}
