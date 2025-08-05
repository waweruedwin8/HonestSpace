import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Upload, User, Briefcase, Shield, Info, CheckCircle, FileText, Phone, Mail } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  
  // Professional Information
  resume: File | null;
  workExperience: string;
  referenceName1: string;
  referenceContact1: string;
  referenceRelationship1: string;
  referenceName2: string;
  referenceContact2: string;
  referenceRelationship2: string;
  
  // Legal Requirements
  idNumber: string;
  policeCustomer?: File | null;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  // Additional Information
  languages: string[];
  areasOfExpertise: string[];
  availability: string;
  transportation: string;
  
  // Agreements
  agreeToTerms: boolean;
  agreeToBackgroundCheck: boolean;
  agreeToTraining: boolean;
}

const initialData: ApplicationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  county: "",
  postalCode: "",
  resume: null,
  workExperience: "",
  referenceName1: "",
  referenceContact1: "",
  referenceRelationship1: "",
  referenceName2: "",
  referenceContact2: "",
  referenceRelationship2: "",
  idNumber: "",
  policeCustomer: null,
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
  languages: [],
  areasOfExpertise: [],
  availability: "",
  transportation: "",
  agreeToTerms: false,
  agreeToBackgroundCheck: false,
  agreeToTraining: false
};

export const ScoutApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof ApplicationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'resume' | 'policeCustomer', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleArrayToggle = (field: 'languages' | 'areasOfExpertise', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Application Submitted Successfully!",
      description: "We'll review your application and contact you within 3-5 business days.",
    });
    
    setIsSubmitting(false);
    // Reset form or redirect
  };

  const saveDraft = () => {
    localStorage.setItem('scoutApplicationDraft', JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved. You can continue later.",
    });
  };

  const stepTitles = [
    "Personal Information",
    "Professional Information", 
    "Legal Requirements",
    "Additional Information",
    "Review & Submit"
  ];

  const stepIcons = [User, Briefcase, Shield, Info, CheckCircle];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Scout Application</h2>
        <p className="text-muted-foreground">Join our network of trusted property verifiers</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {stepTitles.map((title, index) => {
            const StepIcon = stepIcons[index];
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  isCompleted ? 'bg-trust text-trust-foreground' :
                  isActive ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  <StepIcon className="w-5 h-5" />
                </div>
                <span className="text-xs text-center max-w-20">{title}</span>
              </div>
            );
          })}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(stepIcons[currentStep - 1], { className: "w-5 h-5" })}
            {stepTitles[currentStep - 1]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+254 700 000 000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Physical Address *</Label>
                <Input 
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street address, building name, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input 
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Nairobi"
                  />
                </div>
                <div>
                  <Label htmlFor="county">County *</Label>
                  <Select value={formData.county} onValueChange={(value) => handleInputChange('county', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nairobi">Nairobi</SelectItem>
                      <SelectItem value="kiambu">Kiambu</SelectItem>
                      <SelectItem value="machakos">Machakos</SelectItem>
                      <SelectItem value="kajiado">Kajiado</SelectItem>
                      <SelectItem value="mombasa">Mombasa</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input 
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="00100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="resume">CV/Resume Upload *</Label>
                <div className="mt-2">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your CV/Resume here, or click to browse
                    </p>
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('resume', e.target.files?.[0] || null)}
                      className="hidden"
                      id="resume-upload"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.resume && (
                      <Badge variant="secondary" className="mt-2">
                        <FileText className="w-3 h-3 mr-1" />
                        {formData.resume.name}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="workExperience">Work Experience *</Label>
                <Textarea 
                  id="workExperience"
                  value={formData.workExperience}
                  onChange={(e) => handleInputChange('workExperience', e.target.value)}
                  placeholder="Describe your relevant work experience, skills, and qualifications..."
                  rows={6}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">References (Minimum 2)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="referenceName1">Reference 1 Name *</Label>
                    <Input 
                      id="referenceName1"
                      value={formData.referenceName1}
                      onChange={(e) => handleInputChange('referenceName1', e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referenceContact1">Contact *</Label>
                    <Input 
                      id="referenceContact1"
                      value={formData.referenceContact1}
                      onChange={(e) => handleInputChange('referenceContact1', e.target.value)}
                      placeholder="Phone or email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referenceRelationship1">Relationship *</Label>
                    <Input 
                      id="referenceRelationship1"
                      value={formData.referenceRelationship1}
                      onChange={(e) => handleInputChange('referenceRelationship1', e.target.value)}
                      placeholder="e.g., Former employer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="referenceName2">Reference 2 Name *</Label>
                    <Input 
                      id="referenceName2"
                      value={formData.referenceName2}
                      onChange={(e) => handleInputChange('referenceName2', e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referenceContact2">Contact *</Label>
                    <Input 
                      id="referenceContact2"
                      value={formData.referenceContact2}
                      onChange={(e) => handleInputChange('referenceContact2', e.target.value)}
                      placeholder="Phone or email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referenceRelationship2">Relationship *</Label>
                    <Input 
                      id="referenceRelationship2"
                      value={formData.referenceRelationship2}
                      onChange={(e) => handleInputChange('referenceRelationship2', e.target.value)}
                      placeholder="e.g., Character reference"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Legal Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="idNumber">ID/Passport Number *</Label>
                <Input 
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  placeholder="Enter your ID or passport number"
                />
              </div>

              <div>
                <Label htmlFor="policeCustomer">Police Clearance Certificate *</Label>
                <div className="mt-2">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your police clearance certificate
                    </p>
                    <Input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('policeCustomer', e.target.files?.[0] || null)}
                      className="hidden"
                      id="police-upload"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('police-upload')?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.policeCustomer && (
                      <Badge variant="secondary" className="mt-2">
                        <FileText className="w-3 h-3 mr-1" />
                        {formData.policeCustomer.name}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Accepted formats: PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Emergency Contact Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContactName">Contact Name *</Label>
                    <Input 
                      id="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                    <Input 
                      id="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                  <Input 
                    id="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                    placeholder="e.g., Spouse, Parent, Sibling"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label>Languages Spoken *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {['English', 'Swahili', 'Kikuyu', 'Luo', 'Luhya', 'Kamba', 'Other'].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language}`}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={() => handleArrayToggle('languages', language)}
                      />
                      <Label htmlFor={`language-${language}`} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Areas of Expertise</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {[
                    'Residential Properties',
                    'Commercial Properties', 
                    'Student Housing',
                    'Luxury Properties',
                    'Budget Housing',
                    'Photography',
                    'Real Estate',
                    'Customer Service'
                  ].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={`expertise-${area}`}
                        checked={formData.areasOfExpertise.includes(area)}
                        onCheckedChange={() => handleArrayToggle('areasOfExpertise', area)}
                      />
                      <Label htmlFor={`expertise-${area}`} className="text-sm">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="availability">Availability Schedule *</Label>
                <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekdays">Weekdays only</SelectItem>
                    <SelectItem value="weekends">Weekends only</SelectItem>
                    <SelectItem value="flexible">Flexible schedule</SelectItem>
                    <SelectItem value="evenings">Evenings only</SelectItem>
                    <SelectItem value="mornings">Mornings only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transportation">Transportation Method *</Label>
                <Select value={formData.transportation} onValueChange={(value) => handleInputChange('transportation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How do you get around?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own-car">Own Car</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="public-transport">Public Transport</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="ride-hailing">Ride-hailing (Uber/Bolt)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Application Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Location:</strong> {formData.city}, {formData.county}</p>
                  </div>
                  <div>
                    <p><strong>Languages:</strong> {formData.languages.join(', ') || 'Not specified'}</p>
                    <p><strong>Availability:</strong> {formData.availability || 'Not specified'}</p>
                    <p><strong>Transport:</strong> {formData.transportation || 'Not specified'}</p>
                    <p><strong>Documents:</strong> {formData.resume ? 'CV uploaded' : 'CV missing'}, {formData.policeCustomer ? 'Police clearance uploaded' : 'Police clearance missing'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Terms and Agreements</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                      I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a> and 
                      <a href="#" className="text-primary underline"> Privacy Policy</a> of HonestSpace Scout Program.
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToBackgroundCheck"
                      checked={formData.agreeToBackgroundCheck}
                      onCheckedChange={(checked) => handleInputChange('agreeToBackgroundCheck', checked)}
                    />
                    <Label htmlFor="agreeToBackgroundCheck" className="text-sm leading-relaxed">
                      I consent to background verification checks and understand that false information may result in disqualification.
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTraining"
                      checked={formData.agreeToTraining}
                      onCheckedChange={(checked) => handleInputChange('agreeToTraining', checked)}
                    />
                    <Label htmlFor="agreeToTraining" className="text-sm leading-relaxed">
                      I commit to completing the required training program and maintaining certification standards.
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          <Button variant="ghost" onClick={saveDraft}>
            Save Draft
          </Button>
        </div>
        
        <div className="flex gap-2">
          {currentStep < totalSteps && (
            <Button onClick={nextStep}>
              Next Step
            </Button>
          )}
          {currentStep === totalSteps && (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.agreeToTerms || !formData.agreeToBackgroundCheck || !formData.agreeToTraining}
              className="px-8"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};