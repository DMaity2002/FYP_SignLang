from ultralytics import YOLO
import cv2
import supervision as sv
import torch
import os
# import camera_interface

def load_model(model_path=None):
    """Load the YOLO model with CUDA support if available"""
    if torch.cuda.is_available():
        torch.cuda.set_device(0)  # Select GPU device 0
        print("Using CUDA for model inference")
    
    if model_path is None:
        # Try to find the model in various locations
        model_paths = [
            os.path.join(os.path.dirname(os.path.abspath(__file__)), "best_isl.pt"),
            r"best_isl.pt",
            r"C:\Users\USER\Downloads\best_isl.pt"
        ]
        
        for path in model_paths:
            if os.path.exists(path):
                model_path = path
                print(f"Found model at: {path}")
                break
    
    if model_path is None:
        raise FileNotFoundError("Could not find the sign language model file")
        
    return YOLO(model_path)

def process_single_image(image, model=None, load_only=False):
    """Process a single image and return detections"""
    if load_only:
        return load_model()
        
    if model is None:
        model = load_model()
    
    if image is None:
        raise ValueError("No image provided for processing")
    
    # Run inference with confidence threshold
    results = model(image, conf=0.5)[0]
    return results

def segmentation(source='0', show_window=True):    
    """Process video stream and yield frames with detections"""
    model = load_model()
    
    if isinstance(source, str) and source.isdigit():
        source = int(source)

    box_annotator = sv.BoxAnnotator(
        thickness=2
    )

    mask_annotator = sv.MaskAnnotator()

    label_annotator = sv.LabelAnnotator(
        text_thickness=1,
        text_scale=0.5,
        text_padding=1,
        text_position=sv.Position.TOP_LEFT
    )

    # View results
    for result in model.track(source=source, stream=True, show=False):
        frame = result.orig_img
        detections = sv.Detections.from_ultralytics(result)
        
        if result.boxes.id is not None:
            detections.tracker_id = result.boxes.id.cpu().numpy().astype(int)
        
        labels = []
                
        if detections.class_id is not None:
            for i in range(len(detections.class_id)):
                labels.append(f"{model.model.names[detections.class_id[i]]}{detections.confidence[i]: 0.2f} ")
                    
        frame = box_annotator.annotate(
            scene=frame, 
            detections=detections
        )
        
        frame = label_annotator.annotate(
            scene=frame,
            detections=detections
        )

        if show_window:
            cv2.imshow("Sign Language Detection", frame)
            
            if(cv2.waitKey(1) & 0xFF == ord("q")):
                break
        
        yield frame, detections, model

if __name__ == "__main__":
    # Run this when script is executed directly
    for frame, detections, model in segmentation():
        # Just displaying the detection. The yielded values can be used for other purposes.
        pass