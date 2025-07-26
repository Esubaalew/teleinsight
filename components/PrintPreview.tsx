"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ActivityAnalysis from "./ActivityAnalysis";
import ChatInfo from "./ChatInfo";
import CommonWords from "./CommonWords";
import EditedMessages from "./EditedMessages";
import ForwardSources from "./ForwardSources";
import ForwardedMessages from "./ForwardedMessages";
import MessageTypeAnalysis from "./MessageTypeAnalysis";
import ReactionAnalysis from "./ReactionAnalysis";
import ReplyAnalysis from "./ReplyAnalysis";
import TopSenders from "./TopSenders";

interface Message {
  text?: string;
  sticker?: any;
  photo?: any;
  file?: string;
  media_type?: string;
  mime_type?: string;
  animation?: any;
  video_message?: any;
  voice?: any;
  video?: any;
  [key: string]: any;
}

interface ChatData {
  name?: string;
  type?: string;
  id?: string;
  messages: Message[];
}

interface PrintPreviewProps {
  data: ChatData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PrintPreview({ data, open, onOpenChange }: PrintPreviewProps) {
  const componentRef = useRef(null);

  const [printChatInfo, setPrintChatInfo] = useState(true);
  const [printTopSenders, setPrintTopSenders] = useState(true);
  const [printActivityAnalysis, setPrintActivityAnalysis] = useState(true);
  const [printForwardedMessages, setPrintForwardedMessages] = useState(true);
  const [printForwardSources, setPrintForwardSources] = useState(true);
  const [printReplyAnalysis, setPrintReplyAnalysis] = useState(true);
  const [printEditedMessages, setPrintEditedMessages] = useState(true);
  const [printCommonWords, setPrintCommonWords] = useState(true);
  const [printMessageTypeAnalysis, setPrintMessageTypeAnalysis] = useState(true);
  const [printReactionAnalysis, setPrintReactionAnalysis] = useState(true);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const PrintableContent = () => (
    <div ref={componentRef} className="p-8">
      {printChatInfo && <ChatInfo data={data} />}
      {printMessageTypeAnalysis && <MessageTypeAnalysis data={data} />}
      {printReactionAnalysis && <ReactionAnalysis data={data} />}
      {printTopSenders && <TopSenders data={data} />}
      {printActivityAnalysis && <ActivityAnalysis data={data} />}
      {printForwardedMessages && <ForwardedMessages data={data} />}
      {printForwardSources && <ForwardSources data={data} />}
      {printReplyAnalysis && <ReplyAnalysis data={data} />}
      {printEditedMessages && <EditedMessages data={data} />}
      {printCommonWords && <CommonWords data={data} />}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Print Preview</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Customization</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="printChatInfo" checked={printChatInfo} onCheckedChange={() => setPrintChatInfo(!printChatInfo)} />
                <Label htmlFor="printChatInfo">Chat Information</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printMessageTypeAnalysis" checked={printMessageTypeAnalysis} onCheckedChange={() => setPrintMessageTypeAnalysis(!printMessageTypeAnalysis)} />
                <Label htmlFor="printMessageTypeAnalysis">Message Type Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printReactionAnalysis" checked={printReactionAnalysis} onCheckedChange={() => setPrintReactionAnalysis(!printReactionAnalysis)} />
                <Label htmlFor="printReactionAnalysis">Reaction Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printTopSenders" checked={printTopSenders} onCheckedChange={() => setPrintTopSenders(!printTopSenders)} />
                <Label htmlFor="printTopSenders">Top Senders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printActivityAnalysis" checked={printActivityAnalysis} onCheckedChange={() => setPrintActivityAnalysis(!printActivityAnalysis)} />
                <Label htmlFor="printActivityAnalysis">Activity Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printForwardedMessages" checked={printForwardedMessages} onCheckedChange={() => setPrintForwardedMessages(!printForwardedMessages)} />
                <Label htmlFor="printForwardedMessages">Forwarded Messages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printForwardSources" checked={printForwardSources} onCheckedChange={() => setPrintForwardSources(!printForwardSources)} />
                <Label htmlFor="printForwardSources">Forward Sources</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printReplyAnalysis" checked={printReplyAnalysis} onCheckedChange={() => setPrintReplyAnalysis(!printReplyAnalysis)} />
                <Label htmlFor="printReplyAnalysis">Reply Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printEditedMessages" checked={printEditedMessages} onCheckedChange={() => setPrintEditedMessages(!printEditedMessages)} />
                <Label htmlFor="printEditedMessages">Edited Messages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="printCommonWords" checked={printCommonWords} onCheckedChange={() => setPrintCommonWords(!printCommonWords)} />
                <Label htmlFor="printCommonWords">Common Words</Label>
              </div>
            </div>
          </div>
          <div className="col-span-2 border-l pl-8">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="border rounded-lg p-4 h-[600px] overflow-y-auto">
              <PrintableContent />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handlePrint}>Print</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
