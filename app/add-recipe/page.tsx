"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth, db } from "@/config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { PlusSquare } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function AddRecipe() {
  const [title, setTitle] = useState<string>("");
  const [readyInMinutes, setReadyInMinutes] = useState<string>("");
  const [ingredients, setIngredients] = useState<
    { name: string; amount: string; unit: string }[]
  >([]);
  const [procedures, setProcedures] = useState<{
    steps: { number: number; step: string }[];
  }>({ steps: [] });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const currentUser = auth?.currentUser;

  async function createRecipe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    if (currentUser) {
      const recipeCollectionRef = collection(
        db,
        `users/${currentUser.uid}/recipes`
      );
      const data = {
        title,
        createdAt: serverTimestamp(),
        readyInMinutes,
        extendedIngredients: ingredients,
        analyzedInstructions: procedures,
      };
      try {
        const addRecipe = await addDoc(recipeCollectionRef, data);
        console.log(addRecipe);
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <main>
      <div>
        <h4 className="font-semibold text-xl text-center">Add Recipe</h4>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-center">Recipe information</p>
        <form
          className="space-y-4"
          onSubmit={(e: FormEvent<HTMLFormElement>) => createRecipe(e)}
        >
          <div>
            <Label className="font-semibold text-lg">Recipe Title</Label>
            <Input
              placeholder="Add recipe title"
              required={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label className="font-semibold text-lg">Ready in minutes</Label>
            <Input
              placeholder="Estimated time to be prepared"
              required={true}
              onChange={(e) => setReadyInMinutes(e.target.value)}
            />
          </div>

          <div>
            <Label className="font-semibold text-lg">Ingredients</Label>

            <div className="mb-4 mt-2 px-4 py-4 bg-primary40 rounded-lg">
              {ingredients && (
                <div className="space-y-4">
                  {ingredients.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 bg-gray4 px-4 py-2 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.3)]"
                    >
                      <p className="flex-1 font-semibold">{item.name}</p>
                      <p>
                        <span className="text-sm font-semibold">
                          {item.amount}
                        </span>{" "}
                        <span className="text-xs">{item.unit}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <Dialog>
                <DialogTrigger className="bg-primary100 space-x-4 flex gap-4 font-semibold text-white mt-4 w-full text-center  justify-center py-2 rounded-lg">
                  Add Ingredient <PlusSquare stroke="white" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Ingredient</DialogTitle>
                  </DialogHeader>
                  <AddIngredient setIngredients={setIngredients} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold">Procedures</Label>

            <div className="mb-4 mt-2 px-4 py-4 bg-primary40 rounded-lg">
              {procedures && (
                <div className="space-y-4">
                  {procedures.steps.map((item, index) => (
                    <div
                      key={index}
                      className=" gap-2 bg-gray4 px-4 py-2 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.3)]"
                    >
                      <p className="font-semibold">Step {item.number}</p>
                      <p className="text-sm">{item.step}</p>
                    </div>
                  ))}
                </div>
              )}
              <Dialog>
                <DialogTrigger className="bg-primary100 gap-4 text-white font-semibold mt-4 w-full text-center flex justify-center py-2 rounded-lg">
                  Add Step <PlusSquare stroke="white" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Step</DialogTitle>
                  </DialogHeader>
                  <AddProcedure setProcedures={setProcedures} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-primary100 w-[110px] text-white font-semibold hover:bg-primary80"
            disabled={isSubmitting}
          >
            {!isSubmitting ? (
              "Add Recipe"
            ) : (
              <RotatingLines strokeColor="white" strokeWidth="8" />
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}

function AddIngredient({
  setIngredients,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIngredients: (e: any) => void;
}) {
  const [ingredient, setIngredient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  return (
    <div>
      <Input
        placeholder="Ingredient"
        required={true}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <div className="flex gap-2">
        <div>
          <Label className="text-xs">Quantity of ingredient</Label>
          <Input
            placeholder="eg. 1"
            required={true}
            type="number"
            className="w-full mx-auto my-2"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <Label className="text-xs">Measurement unit</Label>
          <Input
            placeholder="eg. kg"
            required={true}
            className="mx-auto my-2 w-full"
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose
          disabled={
            ingredient !== "" && amount !== "" && unit !== "" ? false : true
          }
        >
          <Button
            type="submit"
            className="bg-primary100 font-semibold"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setIngredients((prev: any) => [
                ...prev,
                { name: ingredient, amount, unit },
              ])
            }
          >
            Add
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}

function AddProcedure({
  setProcedures,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProcedures: (e: any) => void;
}) {
  const [procedure, setProcedure] = useState<string>("");
  const [step, setStep] = useState<string>("");
  return (
    <div>
      <Textarea
        placeholder="Add procedure"
        required={true}
        onChange={(e) => setProcedure(e.target.value)}
      ></Textarea>
      <div className="flex gap-2">
        <div>
          <Label className="text-xs">Step Number</Label>
          <Input
            placeholder="eg. 1"
            required={true}
            type="number"
            className="w-full mx-auto my-2"
            onChange={(e) => setStep(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose disabled={procedure !== "" && step !== "" ? false : true}>
          <Button
            type="submit"
            className="bg-primary100 font-semibold"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setProcedures((prev: { steps: any }) => {
                console.log(prev);
                return {
                  ...prev,
                  steps: [...prev.steps, { number: step, step: procedure }],
                };
              })
            }
          >
            Add
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
