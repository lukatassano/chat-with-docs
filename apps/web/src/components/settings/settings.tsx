"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/ui/button";
import {
  promptAtom,
  similarityAtom,
  temperatureAtom,
} from "@ui/contexts/chat-settings";
import { useAtom } from "jotai/react";
import { SettingsIcon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { DialogDescription, DialogTitle } from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { ToastAction } from "../ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

const settingsForm = z.object({
  prompt: z.string(),
  temperature: z.number(),
  similarity: z.number(),
});

type SettingsFormType = z.infer<typeof settingsForm>;

export function Settings() {
  const { toast } = useToast();

  const { register, handleSubmit, reset, control, setValue } =
    useForm<SettingsFormType>({
      resolver: zodResolver(settingsForm),
    });

  const [prompt, setPrompt] = useAtom(promptAtom);
  const [temperature, setTemperature] = useAtom(temperatureAtom);
  const [similarity, setSimilarity] = useAtom(similarityAtom);

  useEffect(() => {
    reset({
      prompt,
      similarity,
      temperature,
    });
  }, [prompt, temperature, similarity]);

  function save(form: SettingsFormType) {
    setPrompt(form.prompt);
    setTemperature(form.temperature);
    setSimilarity(form.similarity);
    showToast();
  }

  function showToast() {
    toast({
      description: "Configuração salva!",
      action: (
        <ToastAction altText="Desfazer configuração" onClick={undo}>
          Desfazer
        </ToastAction>
      ),
    });
  }

  function undo() {
    setPrompt(prompt);
    setTemperature(temperature);
    setSimilarity(similarity);
  }

  function cancel() {
    reset({
      prompt,
      similarity,
      temperature,
    });
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <SettingsIcon size={18} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form onSubmit={handleSubmit(save)}>
          <TooltipProvider>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DialogTitle>Configurações</DialogTitle>
                <DialogDescription>
                  Ajuste os parametros para obter respostas mais acertivas
                </DialogDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="grid gap-8 py-4">
                  <div className="flex items-start justify-center gap-4">
                    <div className="flex-[0.25] text-right mt-1">
                      <Tooltip>
                        <TooltipTrigger>
                          <Label>Prompt</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          Prompt é uma instrucao para a IA obter respostas
                          coerentes com o contexto fornecido
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Textarea
                      {...register("prompt")}
                      id="name"
                      className="flex-1 min-h-[200px]"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex-[0.25] text-right mt-1">
                      <Tooltip>
                        <TooltipTrigger>
                          <Label>Criatividade</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          Um valor mais baixo tornará as respostas mais
                          determinísticas e focadas. <br />
                          Enquanto um valor mais alto, tornará as respostas mais
                          aleatórias
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <Controller
                      name="temperature"
                      control={control}
                      render={({ field: { value } }) => (
                        <>
                          <Slider
                            defaultValue={[20]}
                            onValueChange={newValue => {
                              setValue("temperature", newValue.at(0) || 0);
                            }}
                            value={[value]}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <p className="w-8">{value}%</p>
                        </>
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex-[0.25] mt-1">
                      <Tooltip>
                        <TooltipTrigger>
                          <Label>Similaridade</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          Um valor baixo pode levar a mais correspondências,
                          incluindo documentos ou itens ligeiramente
                          semelhantes. <br />
                          Enquanto um valor alto só incluirá correspondências
                          muito semelhantes
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <Controller
                      name="similarity"
                      control={control}
                      render={({ field: { value } }) => (
                        <>
                          <Slider
                            defaultValue={[80]}
                            onValueChange={newValue => {
                              setValue("similarity", newValue.at(0) || 0);
                            }}
                            value={[value]}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <p className="w-8">{value}%</p>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button type="submit">Salvar</Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="outline" onClick={cancel}>
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </TooltipProvider>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
